import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import Cookies from 'js-cookie';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, usuario } = props;
  const router = useRouter();

  const handleLogout = () => {
    Cookies.set("auth_token", "")
    router.push('/auth/login')
  }
  const handleTrocarSenha = () => {
    Cookies.set("auth_token", "")
    router.push('/auth/trocar-senha')
  }
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          perfil
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {usuario}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleTrocarSenha}>
          Alterar Senha
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
