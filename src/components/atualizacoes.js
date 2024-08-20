import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Stack, TableContainer, Paper } from '@mui/material';
import { atualizacoes } from 'src/utils/notas-atualizacao';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
export const Atualizacoes = () => {
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 520, ...sxCardScrollPersonalizada }}>
                {
                    atualizacoes.map((atualizacao, index) => {
                        return (
                            <Accordion
                                key={`Atualizacao${index + 1}`}
                                sx={{ marginTop: "5px" }}
                                defaultExpanded={atualizacao.expand}
                            >
                                <AccordionSummary
                                    expandIcon={<></>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Stack
                                        direction={`row`}
                                        sx={{ width: "100%", marginLeft: "20px" }}
                                    >
                                        <Stack
                                            sx={{ width: "90%" }}
                                        >
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600, fontSize: "15pt", marginTop: "10px" }}
                                            >
                                                {`Versão: ${atualizacao.titulo}`}
                                            </Typography>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600, fontSize: "12.5pt", marginTop: "10px" }}
                                            >
                                                {`Data da Atualização: ${atualizacao.data}`}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            sx={{ width: "10%" }}
                                        >
                                            <ChevronDownIcon
                                                width={25} height={25}
                                            />
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{ marginLeft: "30px" }}
                                >
                                    <Stack

                                        spacing={.5}
                                        direction="column"
                                    >
                                        {
                                            atualizacao.textos.map((texto, indexText) => {
                                                return (
                                                    <Typography
                                                        key={`text${index + 1}${indexText}`}
                                                        variant="p"
                                                        sx={{ fontWeight: 600, fontSize: "12pt", marginTop: "10px" }}
                                                    >
                                                        {texto}
                                                    </Typography>
                                                )
                                            })
                                        }
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </TableContainer>
        </Paper>
    )
}


// {
//     atualizacoes.map(() => {
//         return (
//             <Stack
//                 key={index}
//                 direction={`column`}

//             >


//                 <Typography
//                     variant="p"
//                     sx={{ fontWeight: 600, fontSize: "15pt", marginTop: "10px" }}
//                 >
//                     {`Versão: ${atualizacao.titulo}`}
//                 </Typography>
//                 <Typography
//                     variant="p"
//                     sx={{ fontWeight: 600, fontSize: "12.5pt", marginTop: "10px" }}
//                 >
//                     {`Data da Atualização: ${atualizacao.data}`}
//                 </Typography>

