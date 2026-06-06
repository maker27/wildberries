const PHONE_MIN_DIGITS = 10;
const CODE_LENGTH = 4;

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '');
}

export function formatPhone(value: string): string {
  let digits = normalizePhone(value);

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.startsWith('7')) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, PHONE_MIN_DIGITS);

  if (!digits) {
    return '';
  }

  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)].filter(
    Boolean,
  );

  let result = '+7';

  if (parts[0]) {
    result += ` ${parts[0]}`;
  }

  if (parts[1]) {
    result += ` ${parts[1]}`;
  }

  if (parts[2]) {
    result += `-${parts[2]}`;
  }

  if (parts[3]) {
    result += `-${parts[3]}`;
  }

  return result;
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
