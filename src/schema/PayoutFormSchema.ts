import { z } from "zod";

export const payoutFormSchema = z.object({
  destinationAccountNumber: z.preprocess(
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
        required_error: "Account number is required",
        invalid_type_error: "Account Number to be paid must be a number",
      })
      .positive({
        message: "Account Number to be paid must be a positive number",
      })
      .refine(
        (value) => {
          const length = value.toString().length;
          return length === 10;
        },
        {
          message: "Account number must be exactly 10 digits long",
        }
      )
  ),

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
      .min(50, { message: "Minimum amount is 50" })
  ),
});
