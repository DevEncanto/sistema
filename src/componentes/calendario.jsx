import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { ptBR } from '@mui/x-date-pickers';
import 'dayjs/locale/pt-br';
import { UserContext } from '../contexts/user-context';


export const Calendario = (props) => {


    const brazilLocale = ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
    const { width, label, item } = props
    const { formularioEntrada, alterarDados } = React.useContext(UserContext)


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
                value={formularioEntrada[item]}
                onChange={e => alterarDados(e, item)}
                renderInput={(params) => <TextField sx={sx} {...params} error={false} placeholder={"DD/MM/YYYY"} />}
            />
        </LocalizationProvider>
    )
}   
