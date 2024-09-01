import { z } from "zod";

export const payoutFormSchema = z.object({
  destinationAccountNumber: z
    .string()
    .min(10, { message: "Account Number must be a 10 digit number" })
    .max(10, { message: "Account Number is too long" }),
  bankCode: z.string().min(1, { message: "Please select a bank" }),
  bankName: z.string(),
  amountToBePaid: z
    .string()
    .min(1, { message: "Amount to be paid  is required" }),
});
