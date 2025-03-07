import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers";
import {AuthButtonServer} from "@/app/components/auth-button-server";
import {redirect} from "next/navigation";
import {PostsList} from "@/app/components/posts-list";
import {Database} from "@/app/types/database";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({cookies})
  const {data: {session}} = await supabase.auth.getSession()
  // ruta protegida (siempre que no haya session va a mandar a /login)
  if (session === null) {
    redirect("/login");
  }
  const {data: posts} = await supabase
    .from('posts')
    .select('*, user:users(*)')// dentro del parentesis va el dato que se quiere recuperar,
  //  y se usa user: para que no use el nombre users para traer los datos (
  // const {
  //   user_name: userName,
  //   name: userFullName,
  //   avatar_url: avatarUrl
  // } = user)   <---- user:users


  // hacer esto es como hacer un JOIN del id del user_id y la
  // info del user que tiene ese mismo user_id

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className='max-w-[800px] mx-auto border-l border-r border-white/30 min-h-screen'>
        <AuthButtonServer/>
        <PostsList posts={posts ?? []} />
      </section>

    </main>
  );
}
