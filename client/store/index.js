import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import memesReducer from './allMemes';
import singleMemeReducer from './singleMeme';
import cartItemsReducer from './cart';

const reducer = combineReducers({
  auth,
  memes: memesReducer,
  singleMeme: singleMemeReducer,
  cartItems: cartItemsReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
