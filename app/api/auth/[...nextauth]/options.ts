import { prisma } from "@/prisma/prisma";
import { User } from "./../../../../node_modules/.prisma/client/index.d";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const User = await prisma.user.findUnique({
          where: {
            username: credentials!.username,
          },
        });

        if (!User) {
          return null;
        }

        const match = await bcrypt.compare(
          credentials!.password,
          User.password
        );
        if (!match) {
          return null;
        } else {
          // Return user object if credentials are valid
          return User;
        }
      },
    }),
  ],

  callbacks :{
    async jwt({token,account,user}){
        if (account) {
            token.role=user.role;
        }
        return token;
    },
     session({session,token}){
        if (session.user) {
            session.user.role = token.role || "USER"; 
        }
        return session;
    }
  }
};

export default options;
