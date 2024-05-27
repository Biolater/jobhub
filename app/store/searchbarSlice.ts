import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface SearchbarState {
  value: string;
}

// Define the initial state using that type
const initialState: SearchbarState = {
  value: "",
};

export const searchbarSlice = createSlice({
  name: "searchbar",
  initialState,
  reducers: {
    handleSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { handleSearch } = searchbarSlice.actions;
export const selectSearchbarValue = (state: RootState) => state.searchbar.value;
export default searchbarSlice.reducer;
