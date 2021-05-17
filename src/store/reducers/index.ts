import { combineReducers } from 'redux';
// import PaymentReducer from './paymentDetails';
import DefaultsReducer from './defaults';
import PaymentReducer from './payments'

const rootReducer = combineReducers({
  defaults: DefaultsReducer,
  payments: PaymentReducer
});

export type RootState = ReturnType<typeof rootReducer>;

/*
    Saving to LocalStorage is achieved using Redux
    middleware. The 'save' method is called by Redux
    each time an action is handled by your reducer.
*/

export default rootReducer;
