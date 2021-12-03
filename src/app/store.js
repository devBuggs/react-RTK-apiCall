import { configureStore } from '@reduxjs/toolkit';
import reducer from '../Redux/RootReducer';


export const store = configureStore({
  reducer: reducer,
});
