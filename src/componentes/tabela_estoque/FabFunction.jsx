import { Fab } from '@mui/material';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';

export const FabClick = () => {

    const { parcelar } = useContext(UserContext)
    return (
        <Fab
            color="primary"
            aria-label="add"

            onClick={parcelar}
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