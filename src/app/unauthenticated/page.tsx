import getUserSession from "@/utils/getUserSession";
import { redirect } from "next/navigation";

export default async function Unauthenticated() {
  const session = await getUserSession();

  // If auth user, redirect back to home page
  if (session) {
    redirect('/');
  } 

  return (
    <div className="p-4">
      <p>Please sign in to see todos!</p>
    </div>
  );
}
