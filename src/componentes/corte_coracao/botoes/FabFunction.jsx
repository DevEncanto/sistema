import { Fab } from '@mui/material';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { useContext } from 'react';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';

export const FabClick = () => {

    const { funcoes } = useContext(EstoqueContext)
    return (
        <Fab
            color="primary"
            aria-label="add"

            onClick={funcoes.parcelar}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "10px",
                width: "35px"
            }}
        >
            <ArrowPathIcon height={20} width={20} fontWeight={600} />
        </Fab>
    )
}