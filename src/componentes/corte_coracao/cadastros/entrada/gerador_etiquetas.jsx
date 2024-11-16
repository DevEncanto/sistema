import { DataContext } from "../../../../contexts/contexts/data.context"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { Etiqueta } from "./etiqueta"
const { Stack, Grid } = require("@mui/material")
import { useReactToPrint } from 'react-to-print';
import { LoaderEstatico } from "../../componentes/loader"
import { useContext, useEffect, useState, useRef } from "react";
import { logger } from "../../../../utils/logger";

export const GeradorEtiquetas = () => {

    const { dData } = useContext(DataContext)
    const { cCorteCoracao } = useContext(CorteCoracaoContext)
    const [etiquetas, setEtiquetas] = useState([])
    const [load, setLoad] = useState(true)
   
    const lazyLoading = async () => {

        let data = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta == cCorteCoracao.id_lote).etiquetas
        
        logger(data)
        setEtiquetas(data)
        setLoad(false)
    }

    useEffect(() => {
        lazyLoading()
    }, [])
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
            {load ?
                <LoaderEstatico />
                :
                <Stack
                    ref={componentRef}
                    sx={{
                        width: "100%",
                        maxHeight: "450px",
                        alignItems: "center",
                        backgroundColor: "purple",
                        overflow: "auto",
                        padding: "10px 80px"
                    }}
                >

                    <Grid
                        container
                        rowSpacing={8}
                        columns={{ xs: 6, sm: 8, md: 12 }}  // Define as colunas para diferentes tamanhos de tela
                        sx={{ padding: "50px 0" }}
                    >
                        {
                            etiquetas.map((etiqueta, index) => {

                                return (
                                    <Etiqueta key={index} etiqueta={etiqueta} />
                                )
                            })
                        }
                    </Grid>
                </Stack >
            }
        </>
    )
}