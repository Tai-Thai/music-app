import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongId: ''
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setCurrentSongId: (state, actions) => {
      state.currentSongId = actions.payload;
    }
  }
});

export const { setCurrentSongId } = songSlice.actions;
export default songSlice.reducer;
