const accountTypes = [
  { code: -1, description: "Please select" },
  { code: 1, description: "Checking" },
  { code: 2, description: "Savings" },
  { code: 3, description: "Business" },
];
const ownershipTypes = ["Please select", "Individual", "Joint", "Corporate"];

export const getAccountTypes = () => accountTypes;
export const getOwnershipTypes = () => ownershipTypes;
export const getDefaultProduct = (accountType) => {
  return {
    id: Math.random(),
    accountTypeCode: accountType.code.toString(),
    accountDescription: accountType.description,
    nickname: accountType.description,
    ownershipType: "Individual",
  };
};
