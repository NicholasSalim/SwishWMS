export const formatCurrency = (
  amount: number | bigint | string,
  locale = "id-ID",
  currency = "IDR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(typeof amount === "string" ? Number(amount) : amount);
};

export const formatNumber = (
  value: number,
  locale = "id-ID",
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(locale, options).format(value);
};

export const formatDate = (
  value: Date | string,
  locale = "id-ID",
  options?: Intl.DateTimeFormatOptions
): string => {
  const d = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(d);
};

export const formatDateTime = (
  value: Date | string,
  locale = "id-ID"
): string => {
  const d = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(d);
};

export const DEFAULT_LOCALE = "id";
export const DEFAULT_TIMEZONE = "Asia/Jakarta";
export const DEFAULT_CURRENCY = "IDR";
