import { configureStore } from '@reduxjs/toolkit';
import songReducer from '~/features/playlist/playlistSlice';

export const store = configureStore({
  reducer: {
    playlist: songReducer
  }
});
