import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

// esto es una opcion de Next.js para evitar que cachee de forma estatica la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // aca se busca el code que se manda como parametro despues de hacer el sign-in con Github 
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code !== null) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    // usando el codigo que le hemos pasado por URL nos devuelve la sesion del usuario
    await supabase.auth.exchangeCodeForSession(code)
  }

  // devuelve al usuario al lugar desde donde hizo el inicio de sesion (origen)
  return NextResponse.redirect(requestUrl.origin)
} 