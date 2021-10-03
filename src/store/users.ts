import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    userCreated: (user, action) => {},
    userFetched: (user, action) => {},
    userFetchedById: (user, action) => {},
  },
});

export const { userCreated, userFetchedById, userFetched } = slice.actions;
export default slice.reducer;
