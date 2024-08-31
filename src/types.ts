export type optionT = {
  label: string;
  value: string;
};

export type BankT = {
  bankId: string | null;
  baseUssdCode: string | null;
  code: string;
  name: string;
  nipBankCode: string;
  transferUssdTemplate: string | null;
  ussdTemplate: string | null;
};
