import NextAuth from "next-auth"
import Googleprovider from "next-auth/providers/google"
 
export const handler = NextAuth({
  providers: [Googleprovider({
    clientId:process.env.AUTH_GOOGLE_ID!,
    clientSecret:process.env.AUTH_GOOGLE_SECRET!

  })],
})