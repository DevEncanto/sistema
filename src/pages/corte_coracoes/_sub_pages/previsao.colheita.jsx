import { Stack, Typography } from "@mui/material";
import { GraficoPrevisaoColheita } from "../_components/graficos/grafico.previsao.colheita";
import { ContainerDashboard } from "../_components/container.dashboard";
import { GraficoPrevistoRealizado } from "../_components/graficos/grafico.previsto.realizado";

export const PrevisaoColheita = () => {


    const propsStackPrincipal = {
        width: "100%",
        height: "100%",
        display: "flex",  // Assegura que o Stack é um flex container
        alignItems: "center",
        justifyContent: "center",
        padding: 0
    };

    return (

        <Stack sx={propsStackPrincipal}>
            <ContainerDashboard width="100%" height="100%">
                <ContainerDashboard width="100%" height="50%" direction="row">
                    <ContainerDashboard height="60%" width="40%">
                        <ContainerDashboard width="100%" height="50%" bkColor="blue" direction="row">
                            <ContainerDashboard width="33%" height="100%" bkColor="red">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%" bkColor="red">
                                <Typography>
                                    % da Meta
                                </Typography>
                                <Typography>
                                    64
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%" bkColor="red">
                                <Typography>
                                    Total Colhido (Ton)
                                </Typography>
                                <Typography>
                                    1.361
                                </Typography>
                            </ContainerDashboard>
                        </ContainerDashboard>
                        <ContainerDashboard width="100%" height="50%" bkColor="red" direction="row">
                            <ContainerDashboard width="33%" height="100%" bkColor="blue">
                                <Typography>
                                    Kg/Cacho
                                </Typography>
                                <Typography>
                                    21.1
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%" bkColor="blue">
                                <Typography>
                                    Prev. Trim (Ton)
                                </Typography>
                                <Typography>
                                    291
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%" bkColor="blue">
                                <Typography>
                                    Total Previsto
                                </Typography>
                                <Typography>
                                    1.828
                                </Typography>
                            </ContainerDashboard>
                        </ContainerDashboard>
                    </ContainerDashboard>
                    <ContainerDashboard height="100%" width="75%">
                        <GraficoPrevisaoColheita width="90%" height="100%" />
                    </ContainerDashboard>
                </ContainerDashboard>
                <ContainerDashboard width="100%" height="50%">
                    <GraficoPrevistoRealizado width="90%" height="100%" />
                </ContainerDashboard>
            </ContainerDashboard>
        </Stack>
    );
};
