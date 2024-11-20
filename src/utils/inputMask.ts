export type MaskType = "cpf";

const createCpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const maskFunctions: Record<MaskType, (value: string) => string> = {
  cpf: createCpfMask,
};

//TODO - Não manipular o DOM diretamente, retornar um valor formatado. Isso ta feiooo, fere o princípio de imutabilidade
export const handleSimpleMask = (
  event: React.ChangeEvent<HTMLInputElement>,
  maskType?: MaskType,
  maxLength?: number
) => {
  const { value } = event.target;

  if (maskType && maskFunctions[maskType]) {
    event.currentTarget.value = maskFunctions[maskType](value);
  }

  if (maxLength && value.length > maxLength) {
    event.currentTarget.value = value.slice(0, maxLength);
  }
};

export const removeNonDigits = (value: string) => {
  return value.replace(/\D/g, "");
};
