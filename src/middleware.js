import { NextResponse } from 'next/server'
import { logger } from './utils/logger'

export async function middleware(request) {
    let cookie = request.cookies.get('auth_token')?.value
    const pathname = request.nextUrl.pathname

    // Verificar se o cookie existe
    if (!cookie) {
        logger("Nenhum cookie encontrado!")
        // Evitar redirecionamento se já estiver na página de login
        if (pathname !== "/auth/login") {
            return NextResponse.redirect(new URL("/auth/login", request.url))
        }
        return NextResponse.next()
    }

    try {
        cookie = JSON.parse(cookie)
    } catch (error) {
        logger("Erro ao fazer o parse do cookie!")
        // Evitar redirecionamento se já estiver na página de login
        if (pathname !== "/auth/login") {
            return NextResponse.redirect(new URL("/auth/login", request.url))
        }
        return NextResponse.next()
    }

    // const { creationTimestamp, expirationTimestamp } = cookie

    // // Verificar se o token é válido
    // if (!isTokenValid(creationTimestamp, expirationTimestamp)) {
    //     logger("Usuário não autenticado!")
    //     // Evitar redirecionamento se já estiver na página de login
    //     if (pathname === "/auth/login") {
    //         logger("Permitir prosseguir na página de login.")
    //         return NextResponse.next()
    //     }
    //     return NextResponse.redirect(new URL("/auth/login", request.url))
    // }

    // Caso o usuário já esteja autenticado e tente acessar a página de login, redirecionar para a home
    if (pathname === "/auth/login") {
        logger("Usuário autenticado, redirecionando para home")
        return NextResponse.redirect(new URL("/home", request.url))
    }

    return NextResponse.next()
}

const isTokenValid = (creationTimestamp, expirationTimestamp) => {
    const currentTimestamp = Date.now()
    return currentTimestamp >= creationTimestamp && currentTimestamp <= expirationTimestamp
}

export const config = {
    matcher: [
        '/home',
        '/',
        '/auth/:path*'
    ]
}
