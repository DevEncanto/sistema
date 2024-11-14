import { cookies } from 'next/headers'


export async function middleware(request, response) {

    console.log("--- Middleware ---")

    const data = JSON.parse(request.cookies.get('auth_token')?.value)

    const {creationTimestamp, expirationTimestamp} = data

    if(isTokenValid(creationTimestamp, expirationTimestamp)){
        console.log("Token Válido")
    }else{
        console.log("Token inválido")
    }

    // const token = true  
    // const signInURL = new URL('/auth/login', request.url)
    // const homeURL = new URL('/home', request.url)
    // const manutencaoURL = new URL('/manutencao', request.url)
    // let mode = "nuvem"
    // const validateAdmin = `${mode === "nuvem" ? "https://www.encanto-service.online" : "http://localhost:4000"}/api/admin/validate`

    // //Verifica se a rota acessada é de utilidade dos admins e valida o usuário
    // //para identificar se ele realmente é um administrador

    // const pathname = request.nextUrl.pathname
    // request.cookies.set("request", "teste")

    // if (!token) {
    //     if (pathname === "/apresentacao" || pathname === "/auth/login" || pathname.includes("/auth/register") || pathname === "/auth/trocar-senha" || pathname === "/manutencao") {
    //         return NextResponse.next()
    //     }
    //     return NextResponse.redirect(signInURL)
    // }
    // if (pathname === "/auth/login" || pathname === "/") {
    //     return NextResponse.redirect(homeURL)
    // }
    return null

}

const isTokenValid = (creationTimestamp, expirationTimestamp) => {
    const currentTimestamp = Date.now(); // Obtém o timestamp atual

    // Verifica se o token ainda está dentro do período de validade
    if (currentTimestamp >= creationTimestamp && currentTimestamp <= expirationTimestamp) {
        return true;  // O token ainda é válido
    } else {
        return false; // O token é inválido ou expirou
    }
}



export const config = {
    matcher: [
        '/auth/:path*',
        '/home'
    ]
}
