import { auth } from "@/server/auth/auth";

/**
 * Check that the current session has a given permission code.
 * Returns the session or throws.
 */
export async function requirePermission(permissionCode: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("UNAUTHENTICATED");
  }
  const permissions: string[] = session.user.permissions ?? [];
  if (!permissions.includes(permissionCode)) {
    throw new Error("FORBIDDEN");
  }
  return session;
}

/**
 * Check that the current session has access to a warehouse.
 */
export async function requireWarehouse(warehouseId: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("UNAUTHENTICATED");
  }
  const warehouseIds: string[] = session.user.warehouseIds ?? [];
  if (!warehouseIds.includes(warehouseId)) {
    throw new Error("FORBIDDEN");
  }
  return session;
}

/**
 * Check that the session has one of several permission codes (any match).
 */
export async function requireAnyPermission(permissionCodes: string[]) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("UNAUTHENTICATED");
  }
  const permissions: string[] = session.user.permissions ?? [];
  const has = permissionCodes.some((code) => permissions.includes(code));
  if (!has) {
    throw new Error("FORBIDDEN");
  }
  return session;
}

/**
 * Check that the session has ALL of the given permission codes.
 */
export async function requireAllPermissions(permissionCodes: string[]) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("UNAUTHENTICATED");
  }
  const permissions: string[] = session.user.permissions ?? [];
  const missing = permissionCodes.filter((code) => !permissions.includes(code));
  if (missing.length > 0) {
    throw new Error("FORBIDDEN");
  }
  return session;
}

export type SessionUser = {
  id: string;
  employeeId: string;
  email: string;
  name?: string | null;
  status: string;
  roles: string[];
  permissions: string[];
  warehouseIds: string[];
};

export const getCurrentUser = async (): Promise<SessionUser | null> => {
  const session = await auth();
  if (!session?.user) return null;
  return session.user as SessionUser;
};
