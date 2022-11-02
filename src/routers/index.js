// import { DefaultLayout } from '~/components/Layout';
import { Home, Collection, Profile } from '~/pages';

export const publishRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/collection',
    component: Collection
  },
  {
    path: '/me',
    component: Profile
  }
];
