import { configureStore } from '@reduxjs/toolkit';
import SavedReducer from './SavedReducer'; // Ensure correct file path
import FavoriteReducer from './favoriteReducer';

const store = configureStore({
  reducer: {
    booking: SavedReducer,
    favorites: FavoriteReducer,
  },
});

export default store;