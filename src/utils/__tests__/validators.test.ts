import { isValidCPF, isValidFullName } from "../validators";

describe("Validators tests", () => {
  describe("CPF Validation", () => {
    it("sshould return true for valid CPF", () => {
      expect(isValidCPF("529.982.247-25")).toBe(true);
      expect(isValidCPF("81117446093")).toBe(true);
    });

    it("should return false for invalid lenght CPF", () => {
      expect(isValidCPF("123")).toBe(false);
      expect(isValidCPF("123456789012")).toBe(false);
    });

    it("should return false for repeated digits on CPF", () => {
      expect(isValidCPF("111.111.111-11")).toBe(false);
      expect(isValidCPF("000.000.000-00")).toBe(false);
    });

    it("should return false for CPF when invalid check digit", () => {
      expect(isValidCPF("529.982.247-26")).toBe(false);
    });
  });

  describe("FullName Validation", () => {
    it("should return true for valid full name", () => {
      const result = isValidFullName("Diego Augusto");
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it("should return false for names when starting with a number", () => {
      const result = isValidFullName("1Diego");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("O nome deve começar com uma letra");
    });

    it("should return false for a name without a space", () => {
      const result = isValidFullName("Diegoo");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("É necessário informar nome e sobrenome");
    });

    it("should return false for name parts with less than 2 characters", () => {
      const result = isValidFullName("D Augusto");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(
        "Cada parte do nome deve ter no mínimo 2 caracteres"
      );
    });

    it("should accept names with numbers in the middle or at the end", () => {
      const result = isValidFullName("Diego Augusto 32");
      expect(result.isValid).toBe(true);
    });

    it("should accept valid compound names", () => {
      const result = isValidFullName("Diego Augusto Gonçalves de Paula");
      expect(result.isValid).toBe(true);
    });
  });
});
