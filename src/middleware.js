export async function middleware(request, response) {

    console.log("--- Middleware ---")

    // let token = request.cookies.get('auth_token')?.value
    // // const token = true  
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


export const config = {
    matcher: [
        '/auth/:path*',
        '/home'
    ]
}
