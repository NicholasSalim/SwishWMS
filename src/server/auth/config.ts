import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { passwordVerify } from "@/lib/password";
import { unauthenticated } from "@/lib/errors";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      employeeId: string;
      email: string;
      name?: string | null;
      status: string;
      roles: string[];
      permissions: string[];
      warehouseIds: string[];
    };
  }

  interface User {
    id: string;
    employeeId: string;
    email: string;
    name?: string | null;
    status: string;
    roles: string[];
    permissions: string[];
    warehouseIds: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    employeeId: string;
    email: string;
    status: string;
    roles: string[];
    permissions: string[];
    warehouseIds: string[];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        employeeId: { label: "Employee ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.employeeId || !credentials?.password) {
          throw unauthenticated("Employee ID dan password diperlukan");
        }

        const user = await db.user.findUnique({
          where: { employeeId: credentials.employeeId as string },
          include: {
            roles: {
              include: {
                role: {
                  include: {
                    rolePermissions: { include: { permission: true } },
                  },
                },
              },
            },
            warehouses: true,
          },
        });

        if (!user || !user.passwordHash) {
          throw unauthenticated("Employee ID atau password salah");
        }

        if (user.status !== "ACTIVE") {
          throw unauthenticated("Akun tidak aktif. Hubungi administrator.");
        }

        const isValid = await passwordVerify(
          credentials.password as string,
          user.passwordHash
        );
        if (!isValid) {
          throw unauthenticated("Employee ID atau password salah");
        }

        const roles = user.roles.map((ur) => ur.role.name);
        const permissions = user.roles.flatMap((ur) =>
          ur.role.rolePermissions.map((rp) => rp.permission.code)
        );
        const warehouseIds = user.warehouses.map((uw) => uw.warehouseId);

        return {
          id: user.id,
          employeeId: user.employeeId,
          email: user.email,
          name: user.name,
          status: user.status,
          roles,
          permissions,
          warehouseIds,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: "swishwms.session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.employeeId = user.employeeId;
        token.email = user.email;
        token.status = user.status;
        token.roles = user.roles;
        token.permissions = user.permissions;
        token.warehouseIds = user.warehouseIds;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.employeeId = token.employeeId;
      session.user.email = token.email;
      session.user.status = token.status;
      session.user.roles = token.roles as string[];
      session.user.permissions = token.permissions as string[];
      session.user.warehouseIds = token.warehouseIds as string[];
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
