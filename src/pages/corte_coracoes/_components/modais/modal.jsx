import { Stack, SvgIcon, Typography } from "@mui/material"
import { useContext, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context";
import { logger } from "../../../../utils/logger";

export const ModalCorteCoracao = (props) => {

    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)
    const { tabela = null, bkColor = "#fff", header = true, destino, children, title, width = "450px", height = "460px", icon = false } = props

    useEffect(() => {


    }, [])

    const handleClick = () => {
        logger(cCorteCoracao.return)
        funcoes.gControleCorteCoracao(cCorteCoracao.return, "tabFiltroListaEtiqueta", false)
        if (tabela) {
            funcoes.gControleCorteCoracao(tabela, "tabela", false)
        }
    }


    return (

        <Stack
            sx={{
                marginTop: "10px",
                width: width,
                height: height,
                backgroundColor: bkColor,
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0px 0px 5px 4px rgba(0,0,0,0.2)",
            }}
        >
            {header ?
                <Stack
                    direction={`row`}
                    sx={{
                        height: "15%",
                        width: "100%",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomColor: "grey"
                    }}
                >
                    <Stack
                        direction={`row`}
                        spacing={2}
                        sx={{
                            width: "90%",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingLeft: "13%"
                        }}
                    >
                        {
                            icon
                                ? <img src="/assets/sirene.gif" width={30} height={30} />
                                : <></>
                        }
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "20px" }}
                        >
                            {title}
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            width: "10%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <SvgIcon
                            onClick={handleClick}
                            sx={{
                                cursor: "pointer"
                            }}
                        >
                            <RiCloseFill />
                        </SvgIcon>
                    </Stack>
                </Stack> :
                <></>
            }
            <Stack
                sx={{
                    height: header ? "85%" : "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </Stack>

        </Stack>
    );

}