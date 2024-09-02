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
        destinationAccountNumber: "123456789", // Less than 10 digits
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: "1000",
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Account number must be exactly 10 digits long"
        );
      }
    });

    it("should reject if more than 10 digits", () => {
      const input = {
        destinationAccountNumber: "12345678901", // More than 10 digits
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: "1000",
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Account number must be exactly 10 digits long"
        );
      }
    });

    it("should reject if empty", () => {
      const input = {
        destinationAccountNumber: "", // Empty string
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: "1000",
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Account number is required"
        );
      }
    });

    it("should accept if exactly 10 digits", () => {
      const input = {
        destinationAccountNumber: "1234567890", // Exactly 10 digits
        bankCode: "123",
        bankName: "Test Bank",
        amountToBePaid: "1000",
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("bankCode", () => {
    it("should reject if empty", () => {
      const input = {
        destinationAccountNumber: "1234567890",
        bankCode: "", // Empty string
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
        amountToBePaid: "", // Empty string
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
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
        amountToBePaid: -1000, // Negative number
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
        amountToBePaid: 1000, // Positive number
      };

      const result = payoutFormSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });
});
