import { createSlice } from '@reduxjs/toolkit';

export const FavoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const itemIndex = state.favorites.findIndex(
        (item) => item.property.id === action.payload.property.id
      );

      if (itemIndex >= 0) {
        // If the item exists, remove it
        state.favorites = state.favorites.filter(
          (item) => item.property.id !== action.payload.property.id
        );
      } else {
        // If the item doesn't exist, add it
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;


