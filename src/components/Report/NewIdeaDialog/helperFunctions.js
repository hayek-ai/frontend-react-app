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

export const verifyIdeaInputs = (state) => {
  const errors = {};
  if (state.symbol === null || state.symbol === "") {
    errors.symbol = "Cannot be blank";
  }
  if (
    state.positionType.toLowerCase() !== "long" &&
    state.positionType.toLowerCase() !== "short"
  ) {
    errors.positionType = "Invalid position type";
  }
  if (state.bullTarget === null || state.bullTarget === "") {
    errors.bullTarget = "Cannot be blank";
  }
  if (state.bullProbability === null || state.bullProbability === "") {
    errors.bullProbability = "Cannot be blank";
  }
  if (state.baseTarget === null || state.baseTarget === "") {
    errors.baseTarget = "Cannot be blank";
  }
  if (state.baseProbability === null || state.baseProbability === "") {
    errors.baseProbability = "Cannot be blank";
  }
  if (state.bearTarget === null || state.bearTarget === "") {
    errors.bearTarget = "Cannot be blank";
  }
  if (state.bearProbability === null || state.bearProbability === "") {
    errors.bearProbability = "Cannot be blank";
  }
  return errors;
};

export const thesisSummaryInitialState = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
        italic: true,
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
        italic: true,
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
        italic: true,
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
        italic: true,
      },
    ],
  },
];
