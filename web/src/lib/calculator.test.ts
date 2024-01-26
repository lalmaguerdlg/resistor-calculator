import { expect, test, describe } from "vitest";
import { Band, ColorBand, ColorValueBand, calculateOhmValue, formatOhmResult, getOhmSymbolByExp } from "./calculator";

const mockBands = [
  {
    color: "pink",
    value: null,
    multiplierExp: -3,
    tolerance: null,
  },
  {
    color: "silver",
    value: null,
    multiplierExp: -2,
    tolerance: 10,
  },
  {
    color: "gold",
    value: null,
    multiplierExp: -1,
    tolerance: 5,
  },
  {
    color: "black",
    value: 0,
    multiplierExp: 0,
    tolerance: null,
  },
  {
    color: "brown",
    value: 1,
    multiplierExp: 1,
    tolerance: 1,
  },
  {
    color: "red",
    value: 2,
    multiplierExp: 2,
    tolerance: 2,
  },
  {
    color: "orange",
    value: 3,
    multiplierExp: 3,
    tolerance: 0.05,
  },
  {
    color: "yellow",
    value: 4,
    multiplierExp: 4,
    tolerance: 0.02,
  },
  {
    color: "green",
    value: 5,
    multiplierExp: 5,
    tolerance: 0.5,
  },
  {
    color: "blue",
    value: 6,
    multiplierExp: 6,
    tolerance: 0.25,
  },
  {
    color: "violet",
    value: 7,
    multiplierExp: 7,
    tolerance: 0.1,
  },
  {
    color: "gray",
    value: 8,
    multiplierExp: 8,
    tolerance: 0.01,
  },
  {
    color: "white",
    value: 9,
    multiplierExp: 9,
    tolerance: null,
  },
] as Band[];

describe("#calculateOhmValue function", () => {
  test("black red black gold: 2 ohms, 5% tolerance", () => {
    const result = calculateOhmValue(
      mockBands,
      "black",
      "red",
      "black",
      "gold"
    );
    expect(result.value).toBe(2);
    expect(result.tolerance).toBe(5);
  });
  test("blue red blue gray: 62 MOhms, 0.01% tolerance", () => {
    const result = calculateOhmValue(
      mockBands,
      "blue",
      "red",
      "blue",
      "gray"
    );
    expect(result.value).toBe(62000000);
    expect(result.tolerance).toBe(0.01);
  });
  test("yellow white green silver: 4.9 MOhms, 10% tolerance", () => {
    const result = calculateOhmValue(
      mockBands,
      "yellow",
      "white",
      "green",
      "silver"
    );
    expect(result.value).toBe(4900000);
    expect(result.tolerance).toBe(10);
  });
});

describe("#getOhmSymbolByExp function with individual exponents", () => {
  test("negative exponents returns Ω", () => {
    const exponents = [-1, -2, -3, -5, -10];
    for (const exp of exponents) {
      const result = getOhmSymbolByExp(exp);
      expect(result).toBe("Ω");
    }
  });
  test("exponents [0,1,2] returns Ω", () => {
    const exponents = [0, 1, 2];
    for (const exp of exponents) {
      const result = getOhmSymbolByExp(exp);
      expect(result).toBe("Ω");
    }
  });
  test("exponents [3,4,5] returns kΩ", () => {
    const exponents = [3, 4, 5];
    for (const exp of exponents) {
      const result = getOhmSymbolByExp(exp);
      expect(result).toBe("kΩ");
    }
  });
  test("exponents [6,7,8] returns MΩ", () => {
    const exponents = [6, 7, 8];
    for (const exp of exponents) {
      const result = getOhmSymbolByExp(exp);
      expect(result).toBe("MΩ");
    }
  });
  test("exponents above 9 returns GΩ", () => {
    const exponents = [9, 10, 11, 20, 44];
    for (const exp of exponents) {
      const result = getOhmSymbolByExp(exp);
      expect(result).toBe("GΩ");
    }
  });
});


describe("#formatOhmResult function", () => {
  const testCases = [
    {
      bands: ["black", "violet", "red", "yellow"],
      expected: "700 Ω ±0.02%",
    },
    {
      bands: ["brown", "black", "green", "silver"],
      expected: "1 MΩ ±10%",
    },
    {
      bands: ["red", "red", "red", "gold"],
      expected: "2.2 kΩ ±5%",
    },
    {
      bands: ["orange", "orange", "orange", "brown"],
      expected: "33 kΩ ±1%",
    },
    {
      bands: ["yellow", "violet", "blue", "silver"],
      expected: "47 MΩ ±10%",
    },
    {
      bands: ["green", "blue", "violet", "gold"],
      expected: "560 MΩ ±5%",
    },
    {
      bands: ["blue", "gray", "brown", "gold"],
      expected: "680 Ω ±5%",
    },
    {
      bands: ["violet", "white", "orange", "silver"],
      expected: "79 kΩ ±10%",
    },
    {
      bands: ["gray", "black", "yellow", "silver"],
      expected: "800 kΩ ±10%",
    },
    {
      bands: ["gold", "gold", "blue", "silver"], // invalid bands
      expected: "0 Ω ±0%", 
    },
  ];
  for (const testCase of testCases) {
    test(`${testCase.bands.join(" ")}: should display "${testCase.expected}"`, () => {
      const result = calculateOhmValue(
        mockBands,
        testCase.bands[0] as ColorValueBand,
        testCase.bands[1] as ColorValueBand,
        testCase.bands[2] as ColorBand,
        testCase.bands[3] as ColorBand,
      );
      const formattedResult = formatOhmResult(result);
      expect(formattedResult).toBe(testCase.expected);
    });
  }
});