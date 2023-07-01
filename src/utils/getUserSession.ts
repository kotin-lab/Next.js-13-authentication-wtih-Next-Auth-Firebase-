import { getServerSession } from 'next-auth';
import type { DefaultSession } from "next-auth";
import { JWT } from 'next-auth/jwt';

// Types
interface UserSession extends DefaultSession {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    uid?: string | null
  }
}

export default async function getUserSession(): Promise<UserSession | null> {
  const session = await getServerSession({
    callbacks: {
      session({ session, token }: { session: UserSession, token: JWT}) {
        if (session.user) {
          session.user.uid = token.sub;
        }
        return session;
      }
    }
  });

  return session;
}