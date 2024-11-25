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
    };

    return (

        <Stack sx={propsStackPrincipal}>
            <ContainerDashboard width="100%" height="100%" bkColor="red">
                <ContainerDashboard width="100%" height="50%" direction="row">
                    <ContainerDashboard height="100%" width="40%" direction="row">
                        <ContainerDashboard height="100%" width="50%">
                            <ContainerDashboard width="100%" height="33%">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="100%" height="33%">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="100%" height="33%">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                        </ContainerDashboard>
                        <ContainerDashboard height="100%" width="50%">
                            <ContainerDashboard width="100%" height="33%">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="100%" height="33%">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="100%" height="33%">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                            
                        </ContainerDashboard>
                        {/* <ContainerDashboard width="100%" height="50%"  direction="row">
                            <ContainerDashboard width="33%" height="100%">
                                <Typography>
                                    Meta 2024(Ton)
                                </Typography>
                                <Typography>
                                    2.130
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%">
                                <Typography>
                                    % da Meta
                                </Typography>
                                <Typography>
                                    64
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%">
                                <Typography>
                                    Total Colhido (Ton)
                                </Typography>
                                <Typography>
                                    1.361
                                </Typography>
                            </ContainerDashboard>
                        </ContainerDashboard> */}
                        {/* <ContainerDashboard width="100%" height="50%" direction="row">
                            <ContainerDashboard width="33%" height="100%" >
                                <Typography>
                                    Kg/Cacho
                                </Typography>
                                <Typography>
                                    21.1
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%" >
                                <Typography>
                                    Prev. Trim (Ton)
                                </Typography>
                                <Typography>
                                    291
                                </Typography>
                            </ContainerDashboard>
                            <ContainerDashboard width="33%" height="100%" >
                                <Typography>
                                    Total Previsto
                                </Typography>
                                <Typography>
                                    1.828
                                </Typography>
                            </ContainerDashboard>
                        </ContainerDashboard> */}
                    </ContainerDashboard>
                    <ContainerDashboard height="100%" width="75%">
                        <GraficoPrevisaoColheita width="100%" height="100%" />
                    </ContainerDashboard>
                </ContainerDashboard>
                <ContainerDashboard width="100%" height="50%"  padding="0px">
                    <GraficoPrevistoRealizado width="100%" height="100%" />
                </ContainerDashboard>
            </ContainerDashboard>
        </Stack>
    );
};
