import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  }
  return "light";
};

interface ThemeState {
  theme: "light" | "dark";
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;