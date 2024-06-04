
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/helper/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AdapterUser } from "next-auth/adapters";
const handler = NextAuth(
{
    adapter: PrismaAdapter(prisma),
    pages:{
        signIn:"/login"
      },
      session:{
        strategy:'jwt',
      },
      debug:process.env.NODE_ENV ==='development',
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials:{
                    email:{label:"email",type:"email",placeholder:"example@example.com"},
                    password:{label:"password",type:"password",placeholder:"******"},
            },
            async authorize(credentials:any,req){
                    
                    const {email,password} = credentials 
                    const user = await prisma.user.findUnique({where:{email}})
                    if(!user){
                            return null
                    }
                    const isPasswordMatched = user.password === password;
                    if(!isPasswordMatched){
                            return null
                    }
                    return user;
            }
          }),
          // add other providers here
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID||"",
            
            clientSecret:process.env.GOOGLE_CLIENT_SECRET||"" ,
            authorization:{
              params:{}
            },
           
        }),


    ],
    
   
     callbacks:{
            async signIn(params) {
                const { account, user,profile } = params;
                if (account?.provider === 'google') {
                  // User signed in using Google authentication
                  if(user.email){
                  const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                  });
                    
                  if (existingUser) {
                    console.log('User signed in using Google ,Already exists================>>>>>>>>>');
                    return true;
                  }
                  }
              
                
                } else if (account?.provider === 'credentials') {
                  // User signed in using credentials (email/password)
                  return true;
                }
                return false;
               
        },
                async jwt(params) {
                  let { token, user } = params;
                  if (user) {
                   token = { ...token,...user };
                    
                  }
                  return token;
                },
                async session(params) {
                  let { token, session } = params;
                  session.user = { ...session.user, role:token.role};
                  // (session as any).id = token.id;
                 
                  return session;
                },
        },
    })


export {handler as GET , handler as POST}