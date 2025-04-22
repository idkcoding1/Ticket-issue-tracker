import NextAuth from "next-auth"
import Googleprovider from "next-auth/providers/google"
import authoptions from "./app/auth/Authoptions"
 
export const handler = NextAuth(authoptions)