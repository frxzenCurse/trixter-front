import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import modalsReducer from './modals/reducer';

const rootReducer = combineReducers({
  modals: modalsReducer,
  auth: authReducer,
})


const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
