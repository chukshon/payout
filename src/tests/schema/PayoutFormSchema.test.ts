import { payoutFormSchema } from "../../schema/PayoutFormSchema";

describe("PayoutFormSchema", () => {
  it("should validate a correct form input", () => {
    const validInput = {
      destinationAccountNumber: "1234567890",
      bankCode: "123",
      bankName: "Test Bank",
      amountToBePaid: "1000",
    };

    const result = payoutFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  describe("destinationAccountNumber", () => {
    it("should reject if less than 10 digits", () => {
      const input = {
        destinationAccountNumber: "123456789",
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: "1000",
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Account Number must be a 10 digit number"
        );
      }
    });

    it("should reject if more than 10 digits", () => {
      const input = {
        destinationAccountNumber: "12345678901",
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: "1000",
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Account Number is too long"
        );
      }
    });
  });

  describe("bankCode", () => {
    it("should reject if empty", () => {
      const input = {
        destinationAccountNumber: "1234567890",
        bankCode: "",
        bankName: "Test Bank",
        amountToBePaid: "1000",
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please select a bank");
      }
    });
  });

  describe("amountToBePaid", () => {
    it("should reject if empty", () => {
      const input = {
        destinationAccountNumber: "1234567890",
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: "", // Still test as an empty string
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        console.log(result.error); // Log the error for debugging
        expect(result.error.issues[0].message).toBe(
          "Amount to be paid is required"
        );
      }
    });

    it("should reject if negative", () => {
      const input = {
        destinationAccountNumber: "1234567890",
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: -1000, // Pass as a negative number
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Amount to be paid must be a positive number"
        );
      }
    });

    it("should accept if a positive number", () => {
      const input = {
        destinationAccountNumber: "1234567890",
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: 1000, // Pass as a valid positive number
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });
});
