import { DataContext } from "../../../contexts/contexts/data.context"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { Etiqueta } from "../../../componentes/corte_coracao/cadastros/entrada/etiqueta"
const { Stack, Grid, Button, TextField } = require("@mui/material")
import { useReactToPrint } from 'react-to-print';
import { LoaderEstatico } from "../_components/loader"
import { useContext, useEffect, useState, useRef } from "react";

const filterEtiquetas = (etiquetas, filterString) => {
    const rangesAndItems = filterString.split(',').map(item => item.trim())
    const validFilters = rangesAndItems.filter(item =>
        /^\d+$/.test(item) || /^\d+-\d+$/.test(item)
    )

    const filteredEtiquetas = new Set()

    for (const filter of validFilters) {
        if (/^\d+$/.test(filter)) {
            // Número único
            filteredEtiquetas.add(filter.padStart(4, '0'))
        } else if (/^\d+-\d+$/.test(filter)) {
            // Intervalo
            const [start, end] = filter.split('-').map(Number)
            for (let i = start; i <= end; i++) {
                filteredEtiquetas.add(String(i).padStart(4, '0'))
            }
        }
    }

    return etiquetas.filter(etiqueta => filteredEtiquetas.has(etiqueta.etiqueta))
}

export const GeradorEtiquetas = () => {

    const { dData } = useContext(DataContext)
    const { cCorteCoracao } = useContext(CorteCoracaoContext)
    const [etiquetas, setEtiquetas] = useState([])
    const [filteredEtiquetas, setFilteredEtiquetas] = useState([])
// Armazena o filtro inserido
    const [load, setLoad] = useState(true)

    const lazyLoading = async () => {
        const data = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta == cCorteCoracao.id_lote).etiquetas
        setEtiquetas(data)
        setFilteredEtiquetas(data) // Inicializa o estado filtrado com todas as etiquetas
        setLoad(false)
    }

    const applyFilter = () => {
        if (cCorteCoracao.filtro.trim() === "") {
            setFilteredEtiquetas(etiquetas) // Sem filtro, mostra todas as etiquetas
        } else {
            const result = filterEtiquetas(etiquetas, cCorteCoracao.filtro)
            setFilteredEtiquetas(result)
        }
    }

    useEffect(() => {
        lazyLoading()
        applyFilter()
    }, [cCorteCoracao.filtro, etiquetas])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    const sx = {
        borderRadius: "12px",
        width: "230px",
        height: "108px",
        margin: "4px",
        padding: "1px 5px",
        alignItems: "center",
        border: "2px solid #000"
    }

    return (
        <>
            {load ? (
                <LoaderEstatico />
            ) : (
                <Stack
                    ref={componentRef}
                    sx={{
                        width: "100%",
                        maxHeight: "540px",
                        alignItems: "center",
                        backgroundColor: "purple",
                        overflow: "auto",
                        padding: "30px 60px"
                    }}
                >
                    {/* <Button
                        ref={filterPopover.anchorRef}
                        onClick={filterPopover.handleOpen}
                    >
                        Filtros
                    </Button> */}
                    
                    <Grid
                        container
                        rowSpacing={8}
                        columns={{ xs: 6, sm: 8, md: 12 }}
                        sx={{ padding: "50px 0" }}
                    >
                        {filteredEtiquetas.map((etiqueta, index) => (
                            <Etiqueta key={index} etiqueta={etiqueta} />
                        ))}
                    </Grid>
                </Stack>
            )}
        </>
    )
}
