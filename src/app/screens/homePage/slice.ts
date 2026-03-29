import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "./../../../lib/types/screen";

const initialState: HomePageState = {
  popularSupplements: [],
  newSupplements: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularSupplements: (state, action) => {
      state.popularSupplements = action.payload;
    },
    setNewSupplements: (state, action) => {
      state.newSupplements = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularSupplements, setNewSupplements, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
