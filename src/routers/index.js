// import { DefaultLayout } from '~/components/Layout';
import { routes } from '~/configs';
import { Home, Collection, Profile, Playlist, Search } from '~/pages';

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
    path: `${routes.playlist}`, // current playlist
    component: Playlist
  },
  {
    path: `${routes.playlist}/:playlistKey`, // show playlist with playlist key
    component: Playlist
  },
  {
    path: routes.profile,
    component: Profile
  },
  {
    path: routes.search,
    component: Search
  }
];
