import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import {AuthButtonServer} from "@/app/components/auth-button-server";
import {redirect} from "next/navigation";


export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const {data: {session}} = await supabase.auth.getSession()
  // ruta protegida (siempre que no haya session va a mandar a /login)
  if (session === null) {
    redirect("/login");
  }
  const { data: posts } = await supabase.from('posts').select()


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      <pre>
        {
          JSON.stringify(posts, null, 2)
        }
      </pre>
    </main>
  );
}
