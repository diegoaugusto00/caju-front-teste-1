import { handleSimpleMask, removeNonDigits } from "../inputMask";

describe("inputMasks tests", () => {
  describe("removeNonDigits", () => {
    it("should remove all non-numeric characters", () => {
      expect(removeNonDigits("123.456.789-00")).toBe("12345678900");
      expect(removeNonDigits("abc123def456")).toBe("123456");
      expect(removeNonDigits("!@#$%^&*()")).toBe("");
    });

    it("should return an empty string for empty input", () => {
      expect(removeNonDigits("")).toBe("");
    });
  });

  describe("handleSimpleMask", () => {
    //TODO - remover any
    let mockEvent: any;

    beforeEach(() => {
      const initialValue = "";
      mockEvent = {
        target: { value: initialValue },
        currentTarget: { value: initialValue },
      };
    });

    it("should apply CPF mask correctly", () => {
      mockEvent.target.value = "12345678900";
      handleSimpleMask(mockEvent, "cpf");
      expect(mockEvent.currentTarget.value).toBe("123.456.789-00");
    });

    it("should respect maxLength when provided", () => {
      mockEvent.target.value = "123456789012345";
      handleSimpleMask(mockEvent, "cpf", 14);
      expect(mockEvent.currentTarget.value.length).toBeLessThanOrEqual(14);
    });

    it("should not modify the value if maskType is not provided", () => {
      const testValue = "12345678900";
      mockEvent.target.value = testValue;
      mockEvent.currentTarget.value = testValue;

      handleSimpleMask(mockEvent);
      expect(mockEvent.currentTarget.value).toBe("12345678900");
    });

    it("should handle empty strings", () => {
      mockEvent.target.value = "";
      handleSimpleMask(mockEvent, "cpf");
      expect(mockEvent.currentTarget.value).toBe("");
    });

    it("should apply partial CPF mask correctly", () => {
      mockEvent.target.value = "123";
      handleSimpleMask(mockEvent, "cpf");
      expect(mockEvent.currentTarget.value).toBe("123");

      mockEvent.target.value = "123456";
      handleSimpleMask(mockEvent, "cpf");
      expect(mockEvent.currentTarget.value).toBe("123.456");
    });
  });
});
