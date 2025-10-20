"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleTheme } from "@/app/store/themeSlice";
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeSwitcher.module.css";

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => dispatch(toggleTheme())}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
