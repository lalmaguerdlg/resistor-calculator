export const COLOR_MULTIPLIER_BANDS = ["pink", "silver", "gold"] as const;
export type ColorMultiplierBand = typeof COLOR_MULTIPLIER_BANDS[number];
export const COLOR_VALUE_BANDS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"] as const;
export type ColorValueBand = typeof COLOR_VALUE_BANDS[number];
export const COLOR_BANDS = [...COLOR_MULTIPLIER_BANDS, ...COLOR_VALUE_BANDS] as const;
export type ColorBand = ColorMultiplierBand | ColorValueBand;


interface Band {
  color: ColorBand | "none";
  value: number | null;
  multiplierExp: number | null;
  tolerance: number | null;
}
const NO_TOLERANCE_BAND: Band = {
  color: "none",
  value: null,
  multiplierExp: null,
  tolerance: 20,
};
const bands: Record<ColorBand, Band> = {
  pink: {
    color: "pink",
    value: null,
    multiplierExp: -3,
    tolerance: null,
  },
  silver: {
    color: "silver",
    value: null,
    multiplierExp: -2,
    tolerance: 10,
  },
  gold: {
    color: "gold",
    value: null,
    multiplierExp: -1,
    tolerance: 5,
  },
  black: {
    color: "black",
    value: 0,
    multiplierExp: 0,
    tolerance: null,
  },
  brown: {
    color: "brown",
    value: 1,
    multiplierExp: 1,
    tolerance: 1,
  },
  red: {
    color: "red",
    value: 2,
    multiplierExp: 2,
    tolerance: 2,
  },
  orange: {
    color: "orange",
    value: 3,
    multiplierExp: 3,
    tolerance: 0.05,
  },
  yellow: {
    color: "yellow",
    value: 4,
    multiplierExp: 4,
    tolerance: 0.02,
  },
  green: {
    color: "green",
    value: 5,
    multiplierExp: 5,
    tolerance: 0.5,
  },
  blue: {
    color: "blue",
    value: 6,
    multiplierExp: 6,
    tolerance: 0.25,
  },
  violet: {
    color: "violet",
    value: 7,
    multiplierExp: 7,
    tolerance: 0.1,
  },
  grey: {
    color: "grey",
    value: 8,
    multiplierExp: 8,
    tolerance: 0.01,
  },
  white: {
    color: "white",
    value: 9,
    multiplierExp: 9,
    tolerance: null,
  },
};

export type OhmValueResult = {
  value: number;
  tolerance: number | null;
}

export function calculateOhmValue(
  bandAColor: ColorValueBand,
  bandBColor: ColorValueBand,
  bandCColor: ColorBand,
  bandDColor?: ColorBand
): OhmValueResult {
  const bandA = bands[bandAColor];
  const bandB = bands[bandBColor];
  const bandCMultiplier = bands[bandCColor];
  const bandDTolerance = bandDColor ? bands[bandDColor] : NO_TOLERANCE_BAND;

  if (
    bandA.value === null ||
    bandB.value === null ||
    bandCMultiplier.multiplierExp === null
  ) {
    throw new Error("Invalid band color");
  }

  const result = (bandA.value * 10 + bandB.value) * Math.pow(10, bandCMultiplier.multiplierExp);

  return { value: result, tolerance: bandDTolerance.tolerance };
}
