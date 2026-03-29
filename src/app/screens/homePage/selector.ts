import { AppRootState } from "./../../../lib/types/screen";
import { createSelector } from "reselect";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularSupplements = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularSupplements,
);

export const retrieveNewSupplements = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newSupplements,
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
