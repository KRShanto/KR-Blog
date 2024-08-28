import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
      image: string;
    };
  }
  interface User {
    id: string;
    token: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    image: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      token: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
      image: string;
    };
  }
}
