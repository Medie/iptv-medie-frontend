import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const THEME_KEY = "medie-theme";
const ThemeContext = createContext({
  theme: "dark",
  isReady: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

function applyThemeClass(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setThemeState(initial);
    applyThemeClass(initial);
    setIsReady(true);
  }, []);

  const persistTheme = useCallback((value) => {
    setThemeState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, value);
    }
    applyThemeClass(value);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(THEME_KEY, next);
      }
      applyThemeClass(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isReady,
      toggleTheme,
      setTheme: persistTheme
    }),
    [theme, isReady, toggleTheme, persistTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
