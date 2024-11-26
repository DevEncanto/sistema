import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { GraficoPrevisaoColheita } from "../_components/graficos/grafico.previsao.colheita";
import { ContainerDashboard } from "../_components/container.dashboard";
import { GraficoPrevistoRealizado } from "../_components/graficos/grafico.previsto.realizado";
import { usePopover } from "../../../hooks/use-popover";
import { AccountPopover } from "../../../layouts/dashboard/account-popover";

export const PrevisaoColheita = () => {


    const propsStackPrincipal = {
        width: "100%",
        height: "100%",
        display: "flex",  // Assegura que o Stack é um flex container
        alignItems: "center",
        justifyContent: "center",
    };


    const accountPopover = usePopover();

    return (

        <Stack sx={propsStackPrincipal}>
            <ContainerDashboard width="100%" height="100%" direction="row" bkColor="blue">
                <ContainerDashboard width="15%" height="100%" padding="0px" bkColor="blue"  >
                    <ContainerDashboard width="100%" height="12%" direction="row">
                        <Typography
                            variant="h5"
                            fontSize={16}
                        >
                            Filtros
                        </Typography>

                        <Tooltip title="Clique para exibir os filtros">
                            <img
                                onClick={accountPopover.handleOpen}
                                src="/assets/filtro.png"
                                alt=""
                                style={{ cursor: "pointer" }}
                                width={26}
                                height={26}
                                ref={accountPopover.anchorRef}
                            />
                        </Tooltip>
                    </ContainerDashboard>
                    <AccountPopover
                        anchorEl={accountPopover.anchorRef.current}
                        open={accountPopover.open}
                        onClose={accountPopover.handleClose}
                        usuario={"Usuário de Teste"}
                    />
                    <ContainerDashboard width="100%" height="14%">
                        <Typography fontSize={14} sx={{}}>
                            Meta 2024(Ton)
                        </Typography>
                        <Typography fontSize={24} fontWeight={600}>
                            2.130
                        </Typography>
                    </ContainerDashboard>
                    <ContainerDashboard width="100%" height="14%">
                        <Typography fontSize={14} sx={{ textAlign: "left" }}>
                            % da Meta
                        </Typography>
                        <Typography fontSize={24} fontWeight={600}>
                            32%
                        </Typography>
                    </ContainerDashboard>
                    <ContainerDashboard width="100%" height="14%">
                        <Typography fontSize={14} sx={{ textAlign: "left" }}>
                            Total Colhido (Ton)
                        </Typography>
                        <Typography fontSize={24} fontWeight={600}>
                            672,14
                        </Typography>
                    </ContainerDashboard>
                    <ContainerDashboard width="100%" height="14%">
                        <Typography fontSize={14} sx={{ textAlign: "left" }}>
                            Prev. Trim. (Ton)
                        </Typography>
                        <Typography fontSize={24} fontWeight={600}>
                            0,00
                        </Typography>
                    </ContainerDashboard>
                    <ContainerDashboard width="100%" height="14%">
                        <Typography fontSize={14} sx={{ textAlign: "left" }}>
                            KG/Cacho
                        </Typography>
                        <Typography fontSize={24} fontWeight={600}>
                            20,10
                        </Typography>
                    </ContainerDashboard>
                    <ContainerDashboard width="100%" height="14%">
                        <Typography fontSize={14} sx={{ textAlign: "left" }}>
                            Total Previsto (Ton)
                        </Typography>
                        <Typography fontSize={24} fontWeight={600}>
                            20,10
                        </Typography>
                    </ContainerDashboard>
                </ContainerDashboard>
                <ContainerDashboard width="100%" height="100%" padding="0px" bkColor="blue">
                    <ContainerDashboard width="100%" height="50%" direction="row" padding="0px">
                        <GraficoPrevisaoColheita width="100%" height="100%" />
                    </ContainerDashboard>
                    <ContainerDashboard width="100%" height="50%" padding="0px">
                        <GraficoPrevistoRealizado width="100%" height="100%" />
                    </ContainerDashboard>
                </ContainerDashboard>
            </ContainerDashboard>
        </Stack>
    );
};
