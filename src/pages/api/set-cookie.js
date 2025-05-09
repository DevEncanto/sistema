import { serialize } from 'cookie';

const SECRET_API_KEY = process.env.SECRET_API_KEY || ''; // Defina isso no arquivo .env

export default function handler(req, res) {

    const { token, apiKey, logout = false } = req.body;

    if (logout) {
        const tokenData = {
            token: ""
        };
        const cookie = serialize('auth_token', JSON.stringify(tokenData), {
            httpOnly: true, // Impede o acesso via JavaScript
            secure: process.env.NODE_ENV === 'production', // Apenas em conexões HTTPS em produção
            sameSite: 'Strict', // Protege contra CSRF
            maxAge: 0, // Validade do cookie igual ao tempo restante até a expiração
            path: '/', // O cookie será acessível em todo o domínio
        });

        // Configurando o cookie na resposta
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ message: 'Logout successfully' });
    }
   
    // Verificando se o método da requisição é POST
    if (req.method === 'POST') {
        // Verificando se o token e os timestamps foram enviados
        // if (!token) {
        //     return res.status(400).json({ message: 'Token, creationTimestamp and expirationTimestamp are required' });
        // }

        // Verificando o cabeçalho 'apiKey' para garantir que a requisição é legítima
        if (apiKey !== SECRET_API_KEY) {
            return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
        }

        // Verificando se o timestamp de expiração não já passou
        // const currentTimestamp = Date.now();
        // if (!logout) {
        //     if (currentTimestamp > expirationTimestamp) {
        //         return res.status(400).json({ message: 'Token has expired' });
        //     }
        // }

        // Criando o objeto de dados para salvar no cookie
        const tokenData = {
            token

        };

        // Definindo o cookie HttpOnly
        const cookie = serialize('auth_token', JSON.stringify(tokenData), {
            httpOnly: true, // Impede o acesso via JavaScript
            secure: process.env.NODE_ENV === 'production', // Apenas em conexões HTTPS em produção
            sameSite: 'Strict', // Protege contra CSRF
            maxAge: 120000, // Validade do cookie igual ao tempo restante até a expiração
            path: '/', // O cookie será acessível em todo o domínio
        });

        // Configurando o cookie na resposta
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ message: 'Cookie HttpOnly set successfully' });
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
