import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { ptBR } from '@mui/x-date-pickers';
import 'dayjs/locale/pt-br';
import { useContext } from 'react';
import { CorteCoracaoContext } from '../../../contexts/contexts/corte.coracao.context';
import { DataContext } from '../../../contexts/contexts/data.context';

export const Calendario = (props) => {
    const brazilLocale = ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
    const { width, label, item, object, disabled = false } = props
    const { dCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)

    const sx = {
        width: width,
        height: "60px"
    }

    const locale = 'pt-br'

    const handleOnChange = (e) => {
        funcoes.gDadosCorteCoracao(object, item, e, false)
        funcoes.gerarPrevisao(e, dData.previsoes_mensais)
    }

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
                value={dCorteCoracao.lote_etiqueta[item]}
                onChange={disabled ? () => { } : e => handleOnChange(e)}
                renderInput={(params) => <TextField sx={sx} {...params} error={false} placeholder={"DD/MM/YYYY"} />}
            />
        </LocalizationProvider>
    )
}   
