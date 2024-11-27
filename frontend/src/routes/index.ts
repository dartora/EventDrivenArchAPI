import DirectionsIcon from '@mui/icons-material/Directions';
import HistoryIcon from '@mui/icons-material/History';
import MapIcon from '@mui/icons-material/Map';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.HistoricoViagem]: {
    component: asyncComponentLoader(() => import('@/pages/HistoricoViagem')),
    path: '/',
    title: 'Histórico de viagens',
    icon: HistoryIcon,
  },
  [Pages.SolicitarViagem]: {
    component: asyncComponentLoader(() => import('@/pages/SolicitarViagem')),
    path: '/SolicitarViagem',
    title: 'Solicitar Viagem',
    icon: DirectionsIcon,
  },
  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Page 2',
    icon: MapIcon,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Page 3',
    icon: TimeToLeaveIcon,
  },
 [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
