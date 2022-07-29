import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { reducer as oidcReducer } from "redux-oidc";
import { History } from "history";

const initialState = {
  sidebarShow: "responsive",
};

const changeState = (
  state = initialState,
  { type, ...rest }: { type: string }
) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const navItems = {
  sideMenu: [],
};

const sideMenuState = (
  state = navItems,
  { type, ...rest }: { type: string }
) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const masterModel = {
  masterData: [],
};

// const categoriesData = {
//   categories: [],
// };

// const searchModel = {
//   searchFilteredData: "",
// };

const masterDataState = (
  state = masterModel,
  { type, ...rest }: { type: string }
) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

// const categoriesDataState = (
//   state = categoriesData,
//   { type, data }: { type: string; data: any }
// ) => {
//   switch (type) {
//     case "categoriesRecords":
//       return { categories: data };
//     default:
//       console.log("processredux", data);
//       return state;
//   }
// };

// const searchRecords = (
//   state = searchModel,
//   { type, data }: { type: string; data: any }
// ) => {
//   switch (type) {
//     case "setSearchData":
//       return { searchFilteredData: data };
//     default:
//       return state;
//   }
// };

const reducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    oidc: oidcReducer,
    menuState: changeState,
    menuItems: sideMenuState,
    masterState: masterDataState,
    // categoriesState: categoriesDataState,
    // searchState: searchRecords,
  });

export default reducer;
