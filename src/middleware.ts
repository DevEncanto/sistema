import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest, response: NextResponse) {

    // let token = request.cookies.get('auth_token')?.value
    const token = true  
    const signInURL = new URL('/auth/login', request.url)
    const homeURL = new URL('/atualizacoes', request.url)
    const manutencaoURL = new URL('/manutencao', request.url)
    let mode = "nuvem"
    const validateAdmin = `${mode === "nuvem" ? "https://www.encanto-service.online" : "http://localhost:4000"}/api/admin/validate`

    //Verifica se a rota acessada é de utilidade dos admins e valida o usuário
    //para identificar se ele realmente é um administrador

    const pathname = request.nextUrl.pathname
    request.cookies.set("request", "teste")

    if (!token) {
        if (pathname === "/apresentacao" || pathname === "/auth/login" || pathname.includes("/auth/register") || pathname === "/auth/trocar-senha" || pathname === "/manutencao") {
            return NextResponse.next()
        }
        return NextResponse.redirect(signInURL)
    }
    if (pathname === "/auth/login" || pathname === "/") {
        return NextResponse.redirect(homeURL)
    }
}

export const config = {
    matcher: [
        '/estatisticas/:path*',
        '/atualizacoes/:path*',
        '/historico-saques/:path*',
        '/perfil/:path*',
        '/auth/:path*',

        '/desafios/:path*',
        '/solicitar-saque/:path*',
        '/admin/:path*',
        '/perfil/:path*',
        '/apresentacao/:path*'
    ]
}
