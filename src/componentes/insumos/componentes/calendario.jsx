import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { ptBR } from '@mui/x-date-pickers';
import 'dayjs/locale/pt-br';
import { useContext } from 'react';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';

export const Calendario = (props) => {


    const brazilLocale = ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
    const { width, label, item, object } = props
    const { dados, funcoes } = useContext(EstoqueContext)

    const sx = {
        width: width,
        height: "60px"
    }

    const locale = 'pt-br'

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={locale}
            localeText={brazilLocale}
        >
            <DatePicker
                key={item}
                error={false}
                label={label}
                color="blue"
                format="DD/MM/YYYY"
                value={dados.entrada_insumo[item]}
                onChange={e => funcoes.gerenciarDadosEstoque(object, item, e, false)}
                renderInput={(params) => <TextField sx={sx} {...params} error={false} placeholder={"DD/MM/YYYY"} />}
            />
        </LocalizationProvider>
    )
}   
