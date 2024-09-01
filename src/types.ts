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

export type AcccountDetailsT = {
  accountNumber: string;
  accountName: string;
  bankCode: string;
};

export type InitiateTransferPayload = {
  amount: number;
  reference: string;
  narration: string;
  destinationBankCode: string;
  destinationAccountNumber: string;
  currency: string;
  sourceAccountNumber: string;
};
