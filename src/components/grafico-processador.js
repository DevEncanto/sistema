import { Stack, Typography } from '@mui/material';
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const GraficoProcessador = (props) => {
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
                    "uso(%)": server?.processador?.uso == undefined ? 0 : server?.processador?.uso,
                    atm: 0
                }
                ]
            )
        } else {
            setUso(
                [...uso,
                {
                    name: "",
                    "uso(%)": server?.processador?.uso == undefined ? 0 : server?.processador?.uso,
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
                    <Typography fontSize={25}>CPU</Typography>
                </Stack>
                <Stack
                    width={`50%`}
                    direction={`row`}
                    justifyContent={`right`}
                >
                    <Typography>
                        {server?.processador?.nome == undefined
                            ? ""
                            : server?.processador?.nome
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
                    <Typography fontSize={12}>% Utilizado</Typography>
                </Stack>
                <Stack
                    width={`50%`}
                    direction={`row`}
                    justifyContent={`right`}
                >
                    <Typography fontSize={12}>100%</Typography>
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
                    width={`50%`}>
                    <Stack direction={`column`}>
                        <Stack>
                            <Typography fontSize={12}>Utilização</Typography>
                        </Stack>
                        <Typography
                            width={`20%`}
                            textAlign={`center`}>
                            {server?.processador?.uso == undefined
                                ? "0%"
                                : `${server?.processador?.uso} %`
                            }
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    alignSelf={`start`}
                    width={`50%`}>
                    <Stack
                        direction={`column`}>
                        <Stack
                            direction={`column`}>
                            <Stack
                                direction={`row`}
                                spacing={5}>
                                <Typography fontSize={12}>Velocidade Base: </Typography>
                                <Typography fontSize={12}>
                                    {server?.processador?.clock == undefined
                                        ? `0,00`
                                        : parseFloat(server?.processador?.clock / 1000).toFixed(2)
                                    } Ghz
                                </Typography>
                            </Stack>
                            <Stack
                                direction={`row`}
                                spacing={11}>
                                <Typography fontSize={12}>Núcleos: </Typography>
                                <Typography fontSize={12}>
                                    {server?.processador?.cores == undefined
                                        ? `0`
                                        : server?.processador?.cores
                                    }
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )
}