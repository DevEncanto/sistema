import { Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { LabelList, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"

const data = [
    { "mes": "Mar", "previsto": 148, "realizado": 122, "ano": 2024, "percentual": "42%" },
    { "mes": "Abr", "previsto": 174, "realizado": 129, "ano": 2024, "percentual": "60%" },
    { "mes": "Mai", "previsto": 124, "realizado": 112, "ano": 2024, "percentual": "38%" },
    { "mes": "Jun", "previsto": 149, "realizado": 134, "ano": 2024, "percentual": "54%" },
    { "mes": "Ago", "previsto": 149, "realizado": 112, "ano": 2024, "percentual": "24%" },
    { "mes": "Set", "previsto": 210, "realizado": 189, "ano": 2024, "percentual": "50%" },
    { "mes": "Out", "previsto": 265, "realizado": 216, "ano": 2024, "percentual": "39%" },
    { "mes": "Nov", "previsto": 176, "realizado": 91, "ano": 2024, "percentual": "33%" },
    { "mes": "Dez", "previsto": 234, "realizado": 0, "ano": 2024, "percentual": "27%" },
    { "mes": "Jan", "previsto": 160, "realizado": 0, "ano": 2025, "percentual": "64%" },
    { "mes": "Fev", "previsto": 11, "realizado": 0, "ano": 2025, "percentual": "29%" }
]





export const GraficoPrevistoRealizado = (props) => {
    const { width, height } = props;
    const maiorValor = useMemo(() => {
        const maxPrevisto = Math.max(...data.map(item => item.previsto)); // Maior valor de "previsto"
        const maxRealizado = Math.max(...data.map(item => item.realizado)); // Maior valor de "realizado"
        const maxValor = Math.max(maxPrevisto, maxRealizado); // Maior entre "previsto" e "realizado"
        return Math.ceil(maxValor * 1.5); // Adiciona 40%
    }, [data]);

    const { y1, y2 } = useMemo(() => {
        // Obter todos os anos presentes nos dados
        const anosContagem = data.reduce((acc, item) => {
            acc[item.ano] = (acc[item.ano] || 0) + 1;
            return acc;
        }, {});

        const totalItems = data.length;

        // Inicializa os objetos y1 e y2
        const anosPercentuais = { y1: { valor: 0, percentual: '0%' }, y2: { valor: 0, percentual: '0%' } };

        // Ordena os anos de forma crescente
        const anos = Object.keys(anosContagem).sort();

        // Calcular os percentuais
        if (anos.length === 1) {
            anosPercentuais.y1 = {
                valor: anos[0], // O ano encontrado
                percentual: `${Math.round((anosContagem[anos[0]] / totalItems) * 100)}%`,
            };
            anosPercentuais.y2 = {
                valor: 0,
                percentual: '0%',
            };
        } else if (anos.length === 2) {
            const percentualY1 = Math.round((anosContagem[anos[0]] / totalItems) * 100);
            let percentualY2 = Math.round((anosContagem[anos[1]] / totalItems) * 100);

            // Corrigir o percentual de Y2 para garantir que a soma seja 100%
            const somaPercentuais = percentualY1 + percentualY2;
            if (somaPercentuais !== 100) {
                percentualY2 = 100 - percentualY1; // Ajusta Y2 para garantir a soma exata de 100%
            }

            anosPercentuais.y1 = {
                valor: anos[0],  // O primeiro ano
                percentual: `${percentualY1}%`,  // Percentual ajustado para garantir a soma de 100%
            };
            anosPercentuais.y2 = {
                valor: anos[1],  // O segundo ano
                percentual: `${percentualY2}%`,  // Percentual ajustado
            };
        }

        return anosPercentuais;
    }, [data]);

    return (
        <Stack
            sx={{
                width: width,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                padding: 0
            }}
        >
            {/* header */}
            <Stack spacing={0} sx={{ height: "15%", width: width }} >


                <Typography fontSize={14} fontWeight={600} sx={{ marginLeft: "5px" }}>
                    Previsto x Realizado
                </Typography>
                <Typography fontSize={12} fontWeight={600} sx={{ marginLeft: "5px" }}>
                    Variação Percentual (Ton) entre o previsto e o realizado ao longo do período de 12 meses.
                </Typography>
                <Divider color="#000" sx={{ height: 2 }} />
            </Stack>
            {/* body */}
            <Stack sx={{ height: "80%", width: width }}>
                <ResponsiveContainer width={width} height={"100%"}>
                    <BarChart data={data}>
                        <XAxis dataKey="mes" />
                        <YAxis domain={[0, maiorValor]} hide={true} />
                        <Tooltip />
                        <Bar dataKey="previsto" fill="#118DFF">
                            <LabelList dataKey="previsto" position="top" />
                        </Bar>
                        <Bar dataKey="realizado" fill="#12239E">
                            <LabelList dataKey="realizado" position="top" />
                            <LabelList dataKey="percentual" position="top" offset={30}/>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Stack>
            <Stack direction={`row`} sx={{ width: width, height: "10%", alignItems: 'center' }}>
                <Stack sx={{ width: y1.percentual, alignItems: "center", justifyContent: "center" }}>
                    <Typography fontSize={14} fontWeight={600}>
                        {y1.valor}
                    </Typography>
                </Stack>
                <Stack sx={{ width: y2.percentual, alignItems: "center", justifyContent: "center" }}>
                    <Typography fontSize={14} fontWeight={600}>
                        {y2.valor === 0 ? "" : y2.valor}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>

    )
}