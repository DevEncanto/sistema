import { Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { LabelList, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

const data = [
  { "semana": "46", "coracoes": 50.2, "percentual": "26.5%", ano: "2024" },
  { "semana": "47", "coracoes": 33.6, "percentual": "26.5%", ano: "2024" },
  { "semana": "48", "coracoes": 46.2, "percentual": "26.5%", ano: "2024" },
  { "semana": "49", "coracoes": 45.9, "percentual": "26.5%", ano: "2024" },
  { "semana": "50", "coracoes": 36.0, "percentual": "26.5%", ano: "2024" },
  { "semana": "51", "coracoes": 42.7, "percentual": "26.5%", ano: "2024" },
  { "semana": "52", "coracoes": 36.5, "percentual": "26.5%", ano: "2024" },
  { "semana": "01", "coracoes": 24.3, "percentual": "26.5%", ano: "2025" },
  { "semana": "02", "coracoes": 24.3, "percentual": "26.5%", ano: "2025" },
  { "semana": "03", "coracoes": 24.3, "percentual": "26.5%", ano: "2025" },
  { "semana": "04", "coracoes": 28.8, "percentual": "26.5%", ano: "2025" },
  { "semana": "05", "coracoes": 55.5, "percentual": "26.5%", ano: "2025" },
  { "semana": "06", "coracoes": 55.9, "percentual": "26.5%", ano: "2025" },
  { "semana": "07", "coracoes": 20.1, "percentual": "26.5%", ano: "2025" },
  { "semana": "08", "coracoes": 10.9, "percentual": "26.5%", ano: "2025" }
];

export const GraficoPrevisaoColheita = (props) => {
  const { width, height } = props;

  const maiorValor = useMemo(() => {
    const maxCoracoes = Math.max(...data.map(item => item.coracoes)); // Encontra o maior valor de "coracoes"
    return Math.ceil(maxCoracoes * 1.4); // Adiciona 40%
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
        <Typography fontSize={14} fontWeight={600} sx={{ marginLeft: "7px" }}>
          Previsão Semanal
        </Typography>
        <Typography fontSize={12} fontWeight={600} sx={{ marginLeft: "7px" }}>
          Variação Percentual referente à semana anterior ao longo do período de 15 semanas.
        </Typography>
        <Divider color="#000" sx={{ height: 2 }} />
      </Stack>
      {/* body */}
      <Stack sx={{ height: "80%", width: width }}>
        <ResponsiveContainer width={width} height={"100%"}>
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



  );
};
