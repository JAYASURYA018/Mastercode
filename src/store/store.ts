import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import { loadUser } from "redux-oidc";
import reducer from "../reducer";
import userManager from "../utils/userManager";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const history = createBrowserHistory();

// create the middleware with the userManager
//const oidcMiddleware = createOidcMiddleware(userManager);

//const loggerMiddleware = (store:any) => (next:any) => (action:any) => {
//    console.log("Action type:", action.type);
//    console.log("Action payload:", action.payload);
//    console.log("State before:", store.getState());
//    next(action);
//    console.log("State after:", store.getState());
//};

const composeEnhancers = composeWithDevTools({
  name: "AEConsole",
  actionsBlacklist: ["REDUX_STORAGE_SAVE"],
});

const initialState = {};

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(thunkMiddleware, routerMiddleware(history))
)(createStore);

const store = createStoreWithMiddleware(reducer(history), initialState);
loadUser(store, userManager);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
