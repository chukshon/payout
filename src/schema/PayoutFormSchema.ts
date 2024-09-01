import { z } from "zod";

export const payoutFormSchema = z.object({
  destinationAccountNumber: z
    .string()
    .min(10, { message: "Account Number must be a 10 digit number" })
    .max(10, { message: "Account Number is too long" }),
  bankCode: z.string().min(1, { message: "Please select a bank" }),
  bankName: z.string(),
  amountToBePaid: z.preprocess(
    (a) => {
      if (typeof a === "string") {
        const trimmed = a.trim();
        if (trimmed === "") return undefined; // Handle empty string as undefined
        const parsed = parseFloat(trimmed);
        if (isNaN(parsed)) return undefined; // Handle non-numeric strings as undefined
        return parsed;
      }
      return a;
    },
    z
      .number({
        required_error: "Amount to be paid is required",
        invalid_type_error: "Amount to be paid must be a number",
      })
      .positive({ message: "Amount to be paid must be a positive number" })
      .min(1, { message: "Amount to be paid is required" })
  ),
});
