import { Stack, Typography } from '@mui/material';
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const GraficoMemoria = (props) => {
    const { height, width, server } = props
    const [uso, setUso] = useState([])

    useEffect(() => {
        if (uso.length == 20) {
            let array = []
            uso.forEach((item, index) => {
                if (index !== 0) {
                    array.push(item)
                }
            })
            setUso(
                [...array,
                {
                    name: "",
                    "uso(%)": server?.memoria?.percEmUso == undefined ? 0 : server?.memoria?.percEmUso,
                    atm: 0
                }
                ]
            )
        } else {
            setUso(
                [...uso,
                {
                    name: "",
                    "uso(%)": server?.memoria?.percEmUso == undefined ? 0 : server?.memoria?.percEmUso,
                    atm: 0
                }
                ]
            )
        }
    }, [server])


    return (
        <Stack direction={`column`}>
            <Stack
                direction={`row`}
                alignItems={`center`}
                alignSelf="start"
                width={`100%`}
            >
                <Stack
                    alignSelf={`start`}
                    width={`50%`}>
                    <Typography fontSize={25}>Memória</Typography>
                </Stack>
                <Stack
                    width={`50%`}
                    direction={`row`}
                    justifyContent={`right`}
                >
                    <Typography>
                        {server?.memoria?.total == undefined
                            ? `0 GB`
                            : `${Math.round(server?.memoria?.total).toFixed(1)} GB`
                        }
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                direction={`row`}
                alignItems={`center`}
                alignSelf="start"
                width={`100%`}
            >
                <Stack
                    alignSelf={`start`}
                    width={`50%`}>
                    <Typography fontSize={12}>Uso da memória</Typography>
                </Stack>
                <Stack
                    width={`50%`}
                    direction={`row`}
                    justifyContent={`right`}
                >
                    <Typography fontSize={12}>
                        {server?.memoria?.total
                            ? `0,00 GB`
                            : `${server?.memoria?.total?.toFixed(1)} GB`
                        }
                    </Typography>
                </Stack>
            </Stack>

            <Stack sx={{ border: "#de3163 solid 2px", borderRadius: "5px" }}>
                <ResponsiveContainer
                    width={width}
                    height={height}>
                    <LineChart
                        width={width}
                        height={height}
                        data={uso}
                        margin={{
                            top: 0,
                            right: 5,
                            left: 5,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line
                            type="monotone"
                            dataKey="uso(%)"
                            stroke="#de3163"
                            activeDot={{ r: 10 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="uv"
                            stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </Stack>
            <Stack
                direction={`row`}
                alignItems={`center`}
                alignSelf="start"
                width={`100%`}
            >
                <Stack
                    alignSelf={`start`}
                    width={`50%`}>
                    <Typography fontSize={12}>Realtime</Typography>
                </Stack>
                <Stack
                    width={`50%`}
                    direction={`row`}
                    justifyContent={`right`}
                >
                    <Typography fontSize={12}>0</Typography>
                </Stack>
            </Stack>
            <Stack
                direction={`row`}
                alignItems={`center`}
                alignSelf="start"
                width={`100%`}
                marginTop={2}
            >
                <Stack
                    alignSelf={`start`}
                    width={`30%`}>
                    <Stack direction={`column`}>
                        <Stack>
                            <Typography fontSize={12}>Em uso (Compactada)</Typography>
                        </Stack>
                        <Typography
                            width={`35%`}
                            textAlign={`center`}
                        >
                            {server?.memoria?.emUso == undefined
                                ? `0,00 GB`
                                : `${server?.memoria?.emUso?.toFixed(1)} GB`
                            }
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    alignSelf={`start`}
                    width={`30%`}>
                    <Stack direction={`column`}>
                        <Stack>
                            <Typography fontSize={12}>Disponível</Typography>
                        </Stack>
                        <Typography
                            width={`35%`}
                            textAlign={`center`}>
                            {server?.memoria?.livre == undefined
                                ? `0,00 GB`
                                : `${server?.memoria?.livre?.toFixed(1)} GB`
                            }
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}