import { useMemo } from "react";
import { LabelList, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"

const data = [
    {
        "mes": "Mar",
        "previsto": 148,
        "realizado": 122
    },
    {
        "mes": "Abr",
        "previsto": 174,
        "realizado": 129
    },
    {
        "mes": "Mai",
        "previsto": 124,
        "realizado": 112
    },
    {
        "mes": "Jun",
        "previsto": 149,
        "realizado": 134
    },
    {
        "mes": "Ago",
        "previsto": 149,
        "realizado": 112
    },
    {
        "mes": "Set",
        "previsto": 210,
        "realizado": 189
    },
    {
        "mes": "Out",
        "previsto": 265,
        "realizado": 216
    },
    {
        "mes": "Nov",
        "previsto": 176,
        "realizado": 91
    },
    {
        "mes": "Dez",
        "previsto": 234,
        "realizado": 0
    },
    {
        "mes": "Jan",
        "previsto": 160,
        "realizado": 0
    },
    {
        "mes": "Fev",
        "previsto": 11,
        "realizado": 0
    },
]




export const GraficoPrevistoRealizado = (props) => {
    const { width, height } = props;
    const maiorValor = useMemo(() => {
        const maxPrevisto = Math.max(...data.map(item => item.previsto)); // Maior valor de "previsto"
        const maxRealizado = Math.max(...data.map(item => item.realizado)); // Maior valor de "realizado"
        const maxValor = Math.max(maxPrevisto, maxRealizado); // Maior entre "previsto" e "realizado"
        return Math.ceil(maxValor * 1.4); // Adiciona 40%
      }, [data]);

    return (

        <ResponsiveContainer width={width} height={height}>
            <BarChart data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="mes" />
            {/* <YAxis domain={[0, maiorValor]} /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="previsto" fill="#118DFF">
                <LabelList dataKey="previsto" position="top" />
            </Bar>
            <Bar dataKey="realizado" fill="#12239E">
                <LabelList dataKey="realizado" position="top" />
            </Bar>
        </BarChart>
        </ResponsiveContainer>

    )
}