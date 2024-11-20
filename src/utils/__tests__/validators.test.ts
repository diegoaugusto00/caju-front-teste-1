import { isValidCPF, isValidFullName } from "../validators";

describe("Validators tests", () => {
  describe("CPF Validation", () => {
    it("deve retornar true para CPF válido", () => {
      expect(isValidCPF("529.982.247-25")).toBe(true);
      expect(isValidCPF("81117446093")).toBe(true);
    });

    it("deve retornar false para CPF com comprimento inválido", () => {
      expect(isValidCPF("123")).toBe(false);
      expect(isValidCPF("123456789012")).toBe(false);
    });

    it("deve retornar false para CPF com dígitos repetidos", () => {
      expect(isValidCPF("111.111.111-11")).toBe(false);
      expect(isValidCPF("000.000.000-00")).toBe(false);
    });

    it("deve retornar false para CPF com dígito verificador inválido", () => {
      expect(isValidCPF("529.982.247-26")).toBe(false);
    });
  });

  describe("Nome Completo Validation", () => {
    it("deve retornar true para nome completo válido", () => {
      const result = isValidFullName("Diego Augusto");
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it("deve retornar false para nome que começa com número", () => {
      const result = isValidFullName("1Diego");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("O nome deve começar com uma letra");
    });

    it("deve retornar false para nome sem espaço", () => {
      const result = isValidFullName("Diegoo");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("É necessário informar nome e sobrenome");
    });

    it("deve retornar false para partes do nome com menos de 2 caracteres", () => {
      const result = isValidFullName("D Augusto");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(
        "Cada parte do nome deve ter no mínimo 2 caracteres"
      );
    });

    it("deve aceitar nomes com números no meio ou final", () => {
      const result = isValidFullName("Diego Augusto 32");
      expect(result.isValid).toBe(true);
    });

    it("deve aceitar nomes compostos válidos", () => {
      const result = isValidFullName("Diego Augusto Gonçalves de Paula");
      expect(result.isValid).toBe(true);
    });
  });
});
