import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Band, getOhmSymbolByExp } from "./calculator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMultiplierExp(multiplierExp: number) {
  const ohmSymbol = getOhmSymbolByExp(multiplierExp);
  const exp = multiplierExp >= 0 ? multiplierExp % 3 : multiplierExp;
  return `x${Math.pow(10, exp)} ${ohmSymbol}`;
}


export function getBandColors(selectedBandColor: Band["color"] | undefined) {
  const bg = selectedBandColor
    ? `bg-${selectedBandColor}-300`
    : "bg-background";
  let text = "text-foreground";
  if (selectedBandColor) {
    text = selectedBandColor === "black" ? "text-[#fff]" : "text-[#000]";
  }
  return [bg, text];
}