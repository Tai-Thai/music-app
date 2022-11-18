import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongId: '',
  indexCurrentSong: null,
  playlist: [],
  listenedSongs: []
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setCurrentSongId: (state, actions) => {
      state.currentSongId = actions.payload;
    },
    setPlaylist: (state, actions) => {
      state.playlist = actions.payload;
    },
    setIndexCurrentSong: (state, actions) => {
      state.indexCurrentSong = actions.payload;
    },
    pushListenedSongs: (state, actions) => {
      if (!state.listenedSongs.includes(actions.payload)) state.listenedSongs.push(actions.payload);
      // remove if listened all of songs
      if (state.listenedSongs.length === state.playlist.songs.length) this.removeListenedSongs();
    },
    removeListenedSongs: (state, actions) => {
      state.listenedSongs = [];
    }
  }
});

export const { setCurrentSongId, setPlaylist, setIndexCurrentSong, pushListenedSongs, removeListenedSongs } = songSlice.actions;
export default songSlice.reducer;
