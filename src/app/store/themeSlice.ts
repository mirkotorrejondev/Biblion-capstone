import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeState = "light" | "dark";

interface ThemeSliceState {
  theme: ThemeState;
}

const initialState: ThemeSliceState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
