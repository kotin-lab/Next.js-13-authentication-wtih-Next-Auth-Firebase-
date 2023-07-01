import { firestore } from "@/firebase/admin";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Types
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  adapter: FirestoreAdapter(firestore) as Adapter,
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }