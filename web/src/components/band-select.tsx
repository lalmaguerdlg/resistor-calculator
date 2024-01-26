import { Band } from "@/lib/calculator";
import { cn, getBandColors } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";


export function BandSelectValue({
  color,
  value,
  className,
}: {
  color: Band["color"];
  value: number | string;
  className?: string;
}) {
  const twColors = getBandColors(color);
  return (
    <div
      className={cn(
        "flex w-full justify-between rounded-sm px-3 py-1",
        ...twColors,
        className
      )}
    >
      <div>{color}</div>
      <div>{value}</div>
    </div>
  );
}

export function BandSelect({
  options,
  value,
  onChange,
}: {
  options: { color: Band["color"]; value: number | string | null }[];
  value: Band["color"] | undefined;
  onChange: (band: Band["color"]) => void;
}) {
  const selectedOption = options.find((b) => b.color === value);
  const twColors = getBandColors(value);
  return (
    <div className="text-lightForeground">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-full", ...twColors)}>
          {selectedOption ? (
            <BandSelectValue
              color={selectedOption.color}
              value={selectedOption.value ?? ""}
            />
          ) : (
            <span>Select a Color Band</span>
          )}
        </SelectTrigger>
        <SelectContent>
          {options.map((op) => (
            <SelectItem key={op.color} value={op.color}>
              <BandSelectValue color={op.color} value={op.value ?? ""} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}