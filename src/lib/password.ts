import { hash, verify } from "@node-rs/argon2";

export const passwordHash = async (password: string): Promise<string> => {
  return hash(password, {
    memoryCost: 65536,
    timeCost: 3,
    outputLen: 32,
    parallelism: 4,
  });
};

export const passwordVerify = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return verify(hash, password);
};

export const passwordPolicy = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireDigit: true,
  requireSymbol: false,
};

export const validatePassword = (password: string): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  if (password.length < passwordPolicy.minLength) {
    errors.push(`Minimal ${passwordPolicy.minLength} karakter`);
  }
  if (password.length > passwordPolicy.maxLength) {
    errors.push(`Maksimal ${passwordPolicy.maxLength} karakter`);
  }
  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Harus mengandung huruf besar");
  }
  if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Harus mengandung huruf kecil");
  }
  if (passwordPolicy.requireDigit && !/\d/.test(password)) {
    errors.push("Harus mengandung angka");
  }
  if (passwordPolicy.requireSymbol && !/[^A-Za-z0-9]/.test(password)) {
    errors.push("Harus mengandung simbol");
  }
  return { valid: errors.length === 0, errors };
};
