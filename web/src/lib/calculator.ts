export const COLOR_MULTIPLIER_BANDS = ["pink", "silver", "gold"] as const;
export type ColorMultiplierBand = (typeof COLOR_MULTIPLIER_BANDS)[number];
export const COLOR_VALUE_BANDS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "gray",
  "white",
] as const;
export type ColorValueBand = (typeof COLOR_VALUE_BANDS)[number];
export const COLOR_BANDS = [
  ...COLOR_MULTIPLIER_BANDS,
  ...COLOR_VALUE_BANDS,
] as const;
export type ColorBand = ColorMultiplierBand | ColorValueBand;

export interface Band {
  color: ColorBand;
  value: number | null;
  multiplierExp: number | null;
  tolerance: number | null;
}

export type OhmValueResult = {
  value: number;
  multiplierExp: number;
  tolerance: number;
};

function findBand(bands: Band[], color: ColorBand): Band | undefined {
  return bands.find((band) => band.color === color);
}

export function calculateOhmValue(
  bands: Band[],
  bandAColor: ColorValueBand,
  bandBColor: ColorValueBand,
  bandCColor: ColorBand,
  bandDColor?: ColorBand
): OhmValueResult {
  const bandA = findBand(bands, bandAColor)?.value;
  const bandB = findBand(bands, bandBColor)?.value;
  const multiplierExp = findBand(bands, bandCColor)?.multiplierExp;
  const tolerance = bandDColor
    ? findBand(bands, bandDColor)?.tolerance
    : undefined;

  if (
    typeof bandA !== "number" ||
    typeof bandB !== "number" ||
    typeof multiplierExp !== "number" ||
    typeof tolerance !== "number"
  ) {
    return { value: 0, multiplierExp: 0, tolerance: 0 };
  }

  const result = (bandA * 10 + bandB) * Math.pow(10, multiplierExp);

  return { value: result, multiplierExp, tolerance };
}

export const OhmSymbols = ["Ω", "kΩ", "MΩ", "GΩ"];
export function getOhmSymbolByExp(exp: number) {
  if (exp < 0) return OhmSymbols[0];
  const index = Math.floor(exp / 3);
  if (index >= OhmSymbols.length) {
    return OhmSymbols[OhmSymbols.length - 1];
  }
  return OhmSymbols[index];
}

export function formatOhmResult(result: OhmValueResult) {
  const exp = Math.floor(Math.log10(result.value));
  const ohmSymbol = getOhmSymbolByExp(exp);
  let value = result.value;
  if (result.value > 0) { 
    if (exp >= 0) {
      value = result.value / Math.pow(10, exp - (exp % 3));
    } else {
      value = Number.parseFloat(result.value.toFixed(4));
    }
  }
  return `${value} ${ohmSymbol} ±${result.tolerance}%`;
}