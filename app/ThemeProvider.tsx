"use client";

import { Theme as RadixTheme } from "@radix-ui/themes";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeAppearance = "dark" | "light";
export type ThemeAccentColor =
  | "iris"
  | "indigo"
  | "violet"
  | "green"
  | "grass"
  | "cyan"
  | "blue"
  | "brown"
  | "crimson"
  | "tomato"
  | "teal"
  | "ruby"
  | "red"
  | "orange"
  | "jade"
  | "plum"
  | "purple";

export type Theme = {
  mode: ThemeAppearance;
  accent: ThemeAccentColor;
};

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
} | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme
      ? JSON.parse(storedTheme)
      : {
          mode: "light",
          accent: "iris",
        };
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <RadixTheme appearance={theme.mode} accentColor={theme.accent}>
        {children}
      </RadixTheme>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
