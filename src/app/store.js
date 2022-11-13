import { configureStore } from '@reduxjs/toolkit';
import songReducer from '~/features/currentSong/currentSongSlice';

export const store = configureStore({
  reducer: {
    currentSong: songReducer
  }
});
