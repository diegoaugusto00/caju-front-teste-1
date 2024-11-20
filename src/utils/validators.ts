export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

export function isValidFullName(name: string): {
  isValid: boolean;
  message?: string;
} {
  const startsWithNumber = /^\d/.test(name);
  if (startsWithNumber) {
    return {
      isValid: false,
      message: "O nome deve começar com uma letra",
    };
  }

  const hasSpace = /\s/.test(name);
  if (!hasSpace) {
    return {
      isValid: false,
      message: "É necessário informar nome e sobrenome",
    };
  }
  const nameParts = name.trim().split(/\s+/);
  const hasShortName = nameParts.some((part) => part.length < 2);
  if (hasShortName) {
    return {
      isValid: false,
      message: "Cada parte do nome deve ter no mínimo 2 caracteres",
    };
  }

  return { isValid: true };
}
