import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useState } from 'react';
import { Stack, TextField } from "@mui/material"
import { UserContext } from '../contexts/user_context/user_context';
import { EstoqueContext } from '../contexts/components_context/estoque_context';


export const Selector = (props) => {
  const { formularioEntrada, funcoes} = useContext(EstoqueContext)

  const { defaultValue, label, width = "170px", item, valores = [] } = props

  return (
    <Box sx={{ width, height: "60px" }}>
      <FormControl fullWidth>
        <TextField
          label={label}
          select
          defaultValue={defaultValue}
          value={formularioEntrada[item]}
          onChange={e => funcoes.alterarDados(e, item)}
        >
          {
            valores.map((item, index) => {
              return (
                <MenuItem key={`select-${index}`} value={item}>{item}</MenuItem>
              )
            })
          }
        </TextField>
      </FormControl>
    </Box>
  );
}