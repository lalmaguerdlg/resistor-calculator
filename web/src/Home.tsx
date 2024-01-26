import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ColorModeToggle } from "@/components/color-mode-toggle";
import {
  Band,
  ColorValueBand,
  OhmValueResult,
  calculateOhmValue,
  formatOhmResult,
} from "@/lib/calculator";
import { cn, formatMultiplierExp, getBandColors } from "@/lib/utils";
import { BandSelect } from "./components/band-select";


function BandDisplay({
  color,
  className,
}: {
  color?: Band["color"];
  className?: string;
}) {
  const bandColor = color ? getBandColors(color) : ["bg-transparent"];
  return <div className={cn(...bandColor, className)}></div>;
}

export function Home() {
  const [bandA, setBandA] = useState<Band["color"] | undefined>();
  const [bandB, setBandB] = useState<Band["color"] | undefined>();
  const [bandC, setBandC] = useState<Band["color"] | undefined>();
  const [bandD, setBandD] = useState<Band["color"] | undefined>();

  const [result, setResult] = useState<OhmValueResult>({
    value: 0,
    multiplierExp: 0,
    tolerance: 0,
  });

  const {
    data: bands,
    isLoading,
    isError,
  } = useQuery<Band[]>({
    queryKey: ["bands"],
    queryFn: async () => (await axios.get<Band[]>("http://localhost:3000/bands")).data,
  });

  useEffect(() => {
    if (!bands) return;
    if (!bandA || !bandB || !bandC || !bandD) return;
    const ohmValue = calculateOhmValue(
      bands,
      bandA as ColorValueBand,
      bandB as ColorValueBand,
      bandC,
      bandD
    );
    setResult(ohmValue);
  }, [bands, bandA, bandB, bandC, bandD]);

  const displayValue = formatOhmResult(result)

  return (
    <main className="min-h-screen">
      <div className="fixed w-full flex justify-end p-5">
        <ColorModeToggle />
      </div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="min-w-[550px] flex flex-col gap-3 p-6 pb-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl">4 Band Resistor</h3>
              <h4 className="text-md">Color Code Calculator</h4>
            </div>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="flex gap-2 px-1 bg-orange-200 rounded-sm">
                <BandDisplay className="w-[12px] h-[24px]" color={bandA} />
                <BandDisplay className="w-[12px] h-[24px]" color={bandB} />
                <BandDisplay className="w-[12px] h-[24px]" color={bandC} />
                <BandDisplay className="w-[12px] h-[24px]" color={bandD} />
              </div>
              <p className="text-2xl">{displayValue ?? "-"}</p>
            </div>
            {isLoading && <div>Loading...</div>}
            {isError && <div className="text-xl">Could not retrieve band data</div>}
            {bands && (
              <div className="flex flex-col gap-3">
                <div>
                  <label>Band A</label>
                  <BandSelect
                    options={bands
                      .filter((b) => b.value !== null)
                      .map((b) => ({
                        color: b.color,
                        value: b.value,
                      }))}
                    value={bandA}
                    onChange={(color) => setBandA(color)}
                  />
                </div>
                <div>
                  <label>Band B</label>
                  <BandSelect
                    options={bands
                      .filter((b) => b.value !== null)
                      .map((b) => ({
                        color: b.color,
                        value: b.value,
                      }))}
                    value={bandB}
                    onChange={(color) => setBandB(color)}
                  />
                </div>
                <div>
                  <label>Band C</label>
                  <BandSelect
                    options={bands
                      .filter((b) => b.multiplierExp !== null)
                      .map((b) => ({
                        color: b.color,
                        value: formatMultiplierExp(b.multiplierExp!),
                      }))}
                    value={bandC}
                    onChange={(color) => setBandC(color)}
                  />
                </div>
                <div>
                  <label>Band D</label>
                  <BandSelect
                    options={bands
                      .filter((b) => b.tolerance !== null)
                      .map((b) => ({
                        color: b.color,
                        value: `±${b.tolerance} %`,
                      }))}
                    value={bandD}
                    onChange={(color) => setBandD(color)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
