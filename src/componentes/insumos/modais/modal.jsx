import { Stack, SvgIcon, Typography } from "@mui/material"
import { useContext, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { UserContext } from "../../../contexts/user_context/user_context";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { DataContext } from "../../../contexts/data_context/data_context";

export const ModalEstoque = (props) => {

    const { funcoes } = useContext(EstoqueContext)
    const { saveLocalStorage } = useContext(DataContext)
    const { destino, children, title, width = "450px", height = "460px" } = props

    useEffect(() => {
        saveLocalStorage()
    }, [])


    return (

        <Stack
            sx={{
                marginTop: "10px",
                width: width,
                height: height,
                backgroundColor: "white",
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0px 0px 5px 4px rgba(0,0,0,0.2)",
            }}
        >
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
                    sx={{
                        width: "90%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: "13%"
                    }}
                >
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
                        onClick={() => funcoes.gerenciarControle(destino, "tabsEntrada", false)}
                        sx={{
                            cursor: "pointer"
                        }}
                    >
                        <RiCloseFill />
                    </SvgIcon>
                </Stack>
            </Stack>
            <Stack
                sx={{
                    height: "85%",
                    width: "100%",

                }}
            >
                {children}
            </Stack>

        </Stack>
    );

}