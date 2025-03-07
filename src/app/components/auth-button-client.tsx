'use client' // este componente se renderiza en el cliente

import { createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import { GithubIcon } from "./icons";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

export function AuthButtonClient({ session }: { session: Session | null }) {

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback' //se usa esto para guardar la informacion de inicio de sesion en una cookie 
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    // para refrescar la ruta, lo que significa que volvera a hacer
    // la parte de auth-button-server. (limpia el Router Cache y hace una request para el servidor
    // para la pagina actual)
    router.refresh()
  }

  return (
    <header>
      {
        session === null
          ? (
            <button onClick={handleSignIn} type="button"
              className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
              <GithubIcon />
              Iniciar sesion con Github
            </button>
          )
          : <Button onPress={handleSignOut}>Cerrar Sesion</Button>

      }

    </header>
  )
}