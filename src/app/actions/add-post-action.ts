'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export const addPost = async (formData: FormData) => {
  'use server'

  const content = formData.get('content')

  if (content === null) return

  const supabase = createServerActionClient({ cookies })
  //revisar si el usuario realmente esta autentificado
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) return

  await supabase.from('posts').insert({ content, user_id: user.id })

  revalidatePath('/')//vuelve a preguntar por la info (revalidando) en el path que se pide '/'
  // instruccion: vuelve a entrar al page, ejecutas nuevamente todo y en el cliente solo aquello que tiene un cambio me lo cambias
}