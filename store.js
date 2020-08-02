import { configureStore } from '@reduxjs/toolkit';

import reducer from './features/boardSlice';

export default configureStore({
  reducer,
  devTools: true,
});
