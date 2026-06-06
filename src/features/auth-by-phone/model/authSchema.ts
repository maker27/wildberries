const PHONE_MIN_DIGITS = 10;
const CODE_LENGTH = 4;

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '');
}

export function validatePhone(value: string): string | null {
  const digits = normalizePhone(value);

  if (digits.length < PHONE_MIN_DIGITS) {
    return 'Введите корректный номер телефона';
  }

  return null;
}

export function validateCode(value: string): string | null {
  if (!new RegExp(`^\\d{${CODE_LENGTH}}$`).test(value)) {
    return `Код должен состоять из ${CODE_LENGTH} цифр`;
  }

  return null;
}

export { CODE_LENGTH, PHONE_MIN_DIGITS };
