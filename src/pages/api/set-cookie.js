import { serialize } from 'cookie';

const NEXT_PUBLIC_SECRET_API_KEY = process.env.NEXT_PUBLIC_SECRET_API_KEY || ''; // Defina isso no arquivo .env

export default function handler(req, res) {
    console.log("================================")
    console.log(req.body)
    // Verificando se o método da requisição é POST
    if (req.method === 'POST') {
        const { token, creationTimestamp, expirationTimestamp, apiKey } = req.body;

        // Verificando se o token e os timestamps foram enviados
        if (!token || !creationTimestamp || !expirationTimestamp) {
            return res.status(400).json({ message: 'Token, creationTimestamp and expirationTimestamp are required' });
        }

        // Verificando o cabeçalho 'apiKey' para garantir que a requisição é legítima
        if (apiKey !== NEXT_PUBLIC_SECRET_API_KEY) {
            return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
        }

        // Verificando se o timestamp de expiração não já passou
        const currentTimestamp = Date.now();
        if (currentTimestamp > expirationTimestamp) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        // Criando o objeto de dados para salvar no cookie
        const tokenData = {
            token,
            creationTimestamp,
            expirationTimestamp,
        };

        // Definindo o cookie HttpOnly
        const cookie = serialize('auth_token', JSON.stringify(tokenData), {
            httpOnly: true, // Impede o acesso via JavaScript
            secure: process.env.NODE_ENV === 'production', // Apenas em conexões HTTPS em produção
            sameSite: 'Strict', // Protege contra CSRF
            maxAge: expirationTimestamp - currentTimestamp, // Validade do cookie igual ao tempo restante até a expiração
            path: '/', // O cookie será acessível em todo o domínio
        });

        // Configurando o cookie na resposta
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ message: 'Cookie HttpOnly set successfully' });
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
