'use client'
import { createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import { GithubIcon } from "./icons";
import { useState, useEffect } from "react";

export function AuthButton() {
  const [session, setSession] = useState<Session | null>(null)

  const supabase = createClientComponentClient();

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
  }

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }
    getSession()
  }, [])

  return (
    <header>
      {
        session === null
          ? (
            <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2" >
              <GithubIcon />
              Iniciar sesion con Github
            </button>
          )
          : <button onClick={handleSignOut}>Cerrar Sesion</button>

      }

    </header>
  )
}