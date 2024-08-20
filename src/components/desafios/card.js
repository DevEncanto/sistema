import { CartaoEstatistica } from '../cartao-estatisticas';
import formatSaldo from 'src/utils/formatarSaldos';

export const Card = (props) => {
    const { data = 0, title, color, icon, type = "saldo" } = props
    return (
        <CartaoEstatistica
            sx={{ width: { sm: "300px" }, height: "120px" }}
            difference={20}
            title={title}
            color={color}
            icon={icon}
            value={
                type == "saldo"
                    ? `R$ ${data == undefined ? "0.00" : formatSaldo(data, 3)}`
                    : data == 0 ? "0.0.0.0" : data
            }
        />
    )
}