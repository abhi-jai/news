import { createStore, combineReducers } from 'redux';
import Reducer from './Reducer';

const rootReducer = combineReducers({store: Reducer});

const Stores = createStore(rootReducer);

export default Stores;