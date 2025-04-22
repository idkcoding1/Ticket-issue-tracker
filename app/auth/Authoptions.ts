import { NextAuthOptions } from "next-auth"
import Googleprovider from "next-auth/providers/google"
 
const authoptions: NextAuthOptions ={
    providers: [Googleprovider({
      clientId:process.env.AUTH_GOOGLE_ID!,
      clientSecret:process.env.AUTH_GOOGLE_SECRET!
  
    })],
    session:{
        strategy : "jwt"
    }
  }

  export default authoptions;