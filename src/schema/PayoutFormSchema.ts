import { z } from "zod";

export const payoutFormSchema = z.object({
  destinationAccountNumber: z
    .string()
    .min(1, { message: "Account Number is too short" })
    .max(10, { message: "Account Number is too long" }),
  bankCode: z.string().min(1, { message: "Please select a bank" }),
  amountToBePaid: z
    .string()
    .min(1, { message: "Amount to be paid  is required" }),
  destinationAccountName: z
    .string()
    .min(1, { message: "Account Name is required" }),
});
