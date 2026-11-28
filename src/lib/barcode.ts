import { db } from "./db";

// Barcode scanning service facade
// Supports camera (ZXing), USB keyboard-wedge, Bluetooth, extensible to handheld terminals

export interface BarcodeScanResult {
  barcode: string;
  format: string;
}

export interface BarcodeLookupResult {
  entityType: "product" | "location" | "transaction";
  entityId: string;
  data: Record<string, unknown>;
}

export const decodeBarcode = async (
  input: string | Uint8Array
): Promise<BarcodeScanResult | null> => {
  // Placeholder: in the browser this delegates to ZXing via the client scanner.
  // Server-side this validates a manually-entered barcode string.
  if (typeof input === "string") {
    return { barcode: input.trim(), format: "MANUAL" };
  }
  return null;
};

export const supportedFormats = ["EAN-13", "Code 128", "QR Code"];

export const isDuplicateBarcode = async (
  barcode: string
): Promise<boolean> => {
  const existing = await db.productBarcode.findUnique({
    where: { barcode },
  });
  return !!existing;
};
