import UserIcon from '@heroicons/react/24/solid/UserIcon';
import CpuChipIcon from '@heroicons/react/24/solid/CpuChipIcon'
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon'
import ServerIcon from '@heroicons/react/24/solid/ServerIcon'
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import LinkIcon from '@heroicons/react/24/solid/LinkIcon';
import { FaBoxes } from "react-icons/fa";
import { SvgIcon } from '@mui/material';
import { GiBananaBunch } from "react-icons/gi";
import { PiPottedPlantFill } from "react-icons/pi";

export const items = {
  USER: [
    {
      title: 'Home',
      path: '/home',
      icon: (
        <SvgIcon fontSize="small">
          <HomeIcon />
        </SvgIcon>
      ),
      mode: "USER"
    },
    {
      title: 'Estoques',
      path: '/estoques',
      icon: (
        <SvgIcon fontSize="small">
          <FaBoxes />
        </SvgIcon>
      ),
      mode: "USER"
    },
    {
      title: 'Corte de Corações',
      path: '/corte_coracoes',
      icon: (
        <SvgIcon fontSize="small">
          <GiBananaBunch />
        </SvgIcon>
      ),
      mode: "USER"
    },
    ,
    {
      title: 'Controle de Campo',
      path: '/controle_campo',
      icon: (
        <SvgIcon fontSize="small">
          <PiPottedPlantFill />
        </SvgIcon>
      ),
      mode: "USER"
    },
  ],
  ADMIN: [
    {
      title: 'Contas Sua URL',
      path: '/admin/contas',
      icon: (
        <SvgIcon fontSize="small">
          <LinkIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    },
    // {
    //   title: 'DRE',
    //   path: '/admin/dre',
    //   icon: (
    //     <SvgIcon fontSize="small">
    //       <PresentationChartBarIcon />
    //     </SvgIcon>
    //   ),
    //   mode: "ADMIN"
    // },
    {
      title: 'Financeiro',
      path: '/admin/financeiro',
      icon: (
        <SvgIcon fontSize="small">
          <CurrencyDollarIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    },
    {
      title: 'Mapeamento',
      path: '/admin/mapeamento',
      icon: (
        <SvgIcon fontSize="small">
          <MapPinIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    },
    {
      title: 'Monitoramento',
      path: '/admin/monitoramento',
      icon: (
        <SvgIcon fontSize="small">
          <CpuChipIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    }
    ,
    {
      title: 'Perfil',
      path: '/perfil',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    }, {
      title: 'Ranking',
      path: '/admin/ranking',
      icon: (
        <SvgIcon fontSize="small">
          <ListBulletIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    },
    {
      title: 'Rotas',
      path: '/admin/rotas',
      icon: (
        <SvgIcon fontSize="small">
          <ServerIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    },
    {
      title: 'Usuários Cadastrados',
      path: '/admin/usuarios',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      ),
      mode: "ADMIN"
    }
  ]
}
