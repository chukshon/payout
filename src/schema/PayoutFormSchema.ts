import { z } from "zod";

export const payoutFormSchema = z.object({
  destinationAccountNumber: z.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Account Number must be a 10-digit number",
  }),
  bankName: z.string(),
  bankCode: z.number(),
  amountToBePaid: z.number(),
});
