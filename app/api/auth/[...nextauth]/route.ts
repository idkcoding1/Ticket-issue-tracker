import NextAuth, { SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/client"; // Ensure correct path
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;