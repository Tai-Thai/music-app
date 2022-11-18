// import { DefaultLayout } from '~/components/Layout';
import { routes } from '~/configs';
import { Home, Collection, Profile, Playlist } from '~/pages';

export const publishRoutes = [
  {
    path: routes.home,
    component: Home
  },
  {
    path: routes.collection,
    component: Collection
  },
  {
    path: `${routes.playlist}/:playlistKey`,
    component: Playlist
  },
  {
    path: routes.profile,
    component: Profile
  }
];
