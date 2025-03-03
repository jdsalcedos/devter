import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { AuthButtonClient } from "./auth-button-client";

// logica del server
export async function AuthButtonServer() {
  const supabase = createServerComponentClient({ cookies: cookies });
  const {data: {session}} = await supabase.auth.getSession()


  return <AuthButtonClient session={session} />;
}