import { Stack } from "@mui/material";
import { useMemo } from "react";
import { LabelList, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

const data = [
  { "semana": "46", "coracoes": 50.2, "percentual": "26.5%" },
  { "semana": "47", "coracoes": 33.6, "percentual": "26.5%" },
  { "semana": "48", "coracoes": 46.2, "percentual": "26.5%" },
  { "semana": "49", "coracoes": 45.9, "percentual": "26.5%" },
  { "semana": "50", "coracoes": 36.0, "percentual": "26.5%" },
  { "semana": "51", "coracoes": 42.7, "percentual": "26.5%" },
  { "semana": "52", "coracoes": 36.5, "percentual": "26.5%" },
  { "semana": "01", "coracoes": 24.3, "percentual": "26.5%" },
  { "semana": "02", "coracoes": 24.3, "percentual": "26.5%" },
  { "semana": "03", "coracoes": 24.3, "percentual": "26.5%" },
  { "semana": "04", "coracoes": 28.8, "percentual": "26.5%" },
  { "semana": "05", "coracoes": 55.5, "percentual": "26.5%" },
  { "semana": "06", "coracoes": 55.9, "percentual": "26.5%" },
  { "semana": "07", "coracoes": 20.1, "percentual": "26.5%" },
  { "semana": "08", "coracoes": 10.9, "percentual": "26.5%" }
];

export const GraficoPrevisaoColheita = (props) => {
  const { width, height } = props;

  const maiorValor = useMemo(() => {
    const maxCoracoes = Math.max(...data.map(item => item.coracoes)); // Encontra o maior valor de "coracoes"
    return Math.ceil(maxCoracoes * 1.4); // Adiciona 40%
  }, [data]);

  return (
    <Stack
      sx={{ width: width, height: height  }}
    >
      <ResponsiveContainer width={width} height={height}>
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="semana" />
          <YAxis domain={[0, maiorValor]} hide={true} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="coracoes" fill="#8884d8">
            <LabelList dataKey="coracoes" position="top" />
            {/* <LabelList dataKey="percentual" position="top" offset={25} /> */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
    </Stack>
  );
};
