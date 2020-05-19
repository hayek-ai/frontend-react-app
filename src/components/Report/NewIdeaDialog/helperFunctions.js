export const calcImpliedReturn = (positionType, target, entry) => {
  if (positionType.toLowerCase() === "long") return target / entry - 1;
  else return 1 - target / entry;
};

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const verifyIdeaData = (state) => {
  const errors = {};
  const bullTarget = parseFloat(state.bullTarget);
  const bullProbability = parseFloat(state.bullProbability);
  const baseTarget = parseFloat(state.baseTarget);
  const baseProbability = parseFloat(state.baseProbability);
  const bearTarget = parseFloat(state.bearTarget);
  const bearProbability = parseFloat(state.bearProbability);

  if (state.symbol === "") {
    errors.symbol = "Cannot be blank";
  }
  if (
    isNaN(bullTarget) ||
    isNaN(bullProbability) ||
    isNaN(baseTarget) ||
    isNaN(baseProbability) ||
    isNaN(bearTarget) ||
    isNaN(bearProbability)
  ) {
    errors.priceTarget = "Invalid Scenario Inputs";
  }
  if (
    bullTarget < 0 ||
    bullProbability < 0 ||
    baseTarget < 0 ||
    baseProbability < 0 ||
    bearTarget < 0 ||
    bearProbability < 0
  ) {
    errors.priceTarget = "Scenario inputs cannot be negative";
  }
  if (bullProbability + baseProbability + bearProbability !== 100) {
    errors.priceTarget = "Scenario probabilities must add up to 100%";
  }
  if (bullTarget < baseTarget || bullTarget < bearTarget) {
    errors.priceTarget =
      "Bull target must be greater than base and bear targets.";
  }
  if (bearTarget > baseTarget) {
    errors.priceTarget = "Bear target must be less than base target";
  }
  if (baseProbability < bullProbability || baseProbability < bearProbability) {
    errors.priceTarget =
      "Base case must be most likely scenario (highest probability).";
  }
  return errors;
};

export const thesisSummaryInitialState = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

export const fullReportInitialState = [
  {
    type: "title",
    children: [{ text: "Company Overview" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
  {
    type: "title",
    children: [{ text: "Key Drivers & Risks" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
  {
    type: "title",
    children: [{ text: "Valuation" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];
