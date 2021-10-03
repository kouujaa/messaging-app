import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "rooms",
  initialState: {
    list:[],
    loading: false
  },
  reducers: {
    roomCreated: (room, action) => {},
    roomFetched: (room, action) => {},
    roomFetchedById: (room, action) => {},
  },
});
export const { roomFetched, roomFetchedById, roomCreated } = slice.actions;
export default slice.reducer;
