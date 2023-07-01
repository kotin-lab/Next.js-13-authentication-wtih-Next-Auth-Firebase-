'use client';

import { singIn, singOut } from "@/firebase/auth";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

type Props = {
  session: Session | null
};

export default function Login({session}: Props) {
  const router = useRouter();

  // handlers

  // handle signIn
  async function handleSignIn() {
    await singIn();
  }

  // handle signOut
  async function handleSignOut() {
    await singOut();
    router.refresh();
  }

  return (
    <div className="flex gap-3 items-center p-4">
      {session ? (
        <button className="underline" onClick={handleSignOut}>Sign out</button>
      ) : (
        <>
          <button className="underline" onClick={handleSignIn}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}
