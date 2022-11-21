import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongId: '',
  indexCurrentSong: null,
  pointerHistory: null, // history to next and previous song
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
      // fix reset
      // reset playlist
      state.indexCurrentSong = null;
      state.pointerHistory = null;
      state.listenedSongs = [];
    },
    setPointerHistory: (state, actions) => {
      if (isNaN(actions.payload)) return;
      state.pointerHistory = actions.payload;
    },
    setIndexCurrentSong: (state, actions) => {
      if (isNaN(actions.payload)) return;
      state.indexCurrentSong = actions.payload;
      // set current song id = index current song
      state.currentSongId = state.playlist?.song?.items[state.indexCurrentSong]?.encodeId;
    },
    pushListenedSongs: (state, actions) => {
      if (isNaN(actions.payload)) return;
      const lengthListenedSongs = state.listenedSongs.length;
      // push listenedSongs
      if (state.listenedSongs[lengthListenedSongs - 1] !== actions.payload) state.listenedSongs.push(actions.payload);
      // remove if listened all of songs
      if (lengthListenedSongs === 10 || lengthListenedSongs === state.playlist?.song?.items.length) state.listenedSongs = [];
    },
    resetPlaylist: (state, actions) => {
      state.listenedSongs = [];
    }
  }
});

export const { setCurrentSongId, setPlaylist, setIndexCurrentSong, pushListenedSongs, setPointerHistory, resetPlaylist } =
  songSlice.actions;
export default songSlice.reducer;
