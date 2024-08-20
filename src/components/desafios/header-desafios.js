import { Stack, Typography, Fab, CardHeader } from "@mui/material"
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon'
import { Card } from "./card";

export const HeaderDesafios = (props) => {
    const { load, handleUpdate, width, saldo, ip } = props
    return (
        <Stack spacing={1}>
            <Stack
                direction={{ sm: "row" }}
                spacing={8}
                sx={{ alignItems: { sm: "center" } }}
            >
                <Stack
                    direction="row"
                    spacing={4}
                    sx={{ alignItems: "center", marginBottom: "5px" }}
                >
                    <Typography variant="h4"
                        sx={{ fontSize: width < 500 ? "10pt" : "23pt" }}
                    >
                        Desafios
                    </Typography>
                    {load ?
                        <img src="/assets/loading.svg" width={40} height={40} />
                        :
                        <Stack
                            sx={{ alignItems: "center" }}
                            spacing={1}
                        >
                            <Fab
                                color="primary"
                                aria-label="add" size='small'
                                onClick={handleUpdate}
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <ArrowDownCircleIcon height={25} width={25} fontWeight={600} />
                            </Fab>
                            <Typography variant='p' sx={{ fontSize: 12, fontWeight: 600 }}>
                                {!load ? "Atualizar Dados!" : ""}
                            </Typography>
                        </Stack>
                    }
                </Stack>
                <Card
                    color={`success.main`}
                    data={saldo}
                    title="Saldo"
                    icon={<CurrencyDollarIcon />}
                />
                <Card
                    color={`cereja.100`}
                    data={ip}
                    type="IP"
                    title="IP Atual"
                    icon={<MapPinIcon />}
                />
            </Stack>


        </Stack>
    )
}