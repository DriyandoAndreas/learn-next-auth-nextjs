import { AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan Password diperlukan");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
                    
          }
        })
        if (!user || !user.password) {
          throw new Error("User tidak ditemukan atau belum mengatur password");
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          throw new Error("Password salah");
        }
        return user;
      },
    }),
  ],
  callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
    return token;
    },
      async session({ session, token }) {
        if (session) {
          token.id = session.user?.email;
        }
      return session;
    },
    },
  session: {
      strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  
};