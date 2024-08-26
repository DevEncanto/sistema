import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useState } from 'react';
import { Stack, TextField } from "@mui/material"
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';

export const Selector = (props) => {
  const { funcoes, dados } = useContext(EstoqueContext)

  const { defaultValue, label, width = "170px", item, valores = [], object } = props

  return (
    <Box sx={{ width: width }}>
      <FormControl fullWidth>
        <TextField
          sx={{ height: "60px" }}
          label={label}
          select
          defaultValue={defaultValue}
          value={dados[object][item]}
          onChange={e => funcoes.gerenciarDadosEstoque(object, item, e)}
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