import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const CartaoEstatistica = (props) => {

    const { difference, sx, value, title, color, icon } = props;

    return (
        <Card sx={{ ...sx,marginBottom: "5px", boxShadow: "0px 4px 11px 2px rgba(0,0,0,0.3)" }}>
            <CardContent
                sx={{ marginTop: "-25px" }}
            >
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                            variant="overline"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="h4"
                            fontSize="16pt">
                            {value}
                        </Typography>
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: color,
                            height: 46,
                            width: 46
                        }}
                    >
                        <SvgIcon>
                            {icon}
                        </SvgIcon>
                    </Avatar>
                </Stack>
                {difference && (
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2 }}
                    >

                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

