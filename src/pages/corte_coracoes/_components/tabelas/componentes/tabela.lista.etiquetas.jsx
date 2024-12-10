import { Stack } from "@mui/material";
import { logger } from "../../../../../utils/logger";
import { TabelasCorteCoracao } from "./tabelas.corte_coracao";

const { useMemo, useContext } = require("react");
const { CorteCoracaoContext } = require("../../../../../contexts/contexts/corte.coracao.context");

export const TabelaListaEtiquetas = () => {

    const { cCorteCoracao, dCorteCoracao: { filtro_lista_etiquetas } } = useContext(CorteCoracaoContext)
    const { lista_etiquetas } = cCorteCoracao
    let areasSelecionadas, statusSelecionados

    const etiquetasFiltradas = useMemo(() => {
        areasSelecionadas = filtro_lista_etiquetas.areas
            .map((area, index) => area.selected ? index : null)
            .filter(index => index !== null);

        statusSelecionados = filtro_lista_etiquetas.status
            .map((status, index) => status.selected ? index : null)
            .filter(index => index !== null);

        return lista_etiquetas.filter(etiqueta => {
            const areaValida = areasSelecionadas.includes(etiqueta.id_area);
            const statusValido = statusSelecionados.includes(etiqueta.id_status);
            logger(etiqueta)
            logger(`Área Válida: ${areaValida} - Status Válido: ${statusValido}`)
            return areaValida && statusValido;
        });
    }, [lista_etiquetas, filtro_lista_etiquetas]);

    return cCorteCoracao.tab == "MOD11" && <Stack>
        {/* {JSON.stringify(lista_etiquetas)} */}
        {/* {JSON.stringify(filtro_lista_etiquetas)} */}

        {JSON.stringify(areasSelecionadas)}
        {JSON.stringify(statusSelecionados)}
        <TabelasCorteCoracao tabela={"lista_etiquetas"} dados={etiquetasFiltradas} />
    </Stack>
}
