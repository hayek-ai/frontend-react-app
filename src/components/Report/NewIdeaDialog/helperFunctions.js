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
  const priceTarget = parseFloat(state.priceTarget);

  if (state.symbol === "") {
    errors.symbol = "Cannot be blank";
  }
  if (state.priceTarget === "") {
    errors.priceTarget = "Cannot be blank";
  }
  if (state.agreedToTerms === false) {
    errors.agreedToTerms = "Must agree to terms and conditions to submit.";
  }
  if (isNaN(priceTarget)) {
    errors.priceTarget = "Invalid input";
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
