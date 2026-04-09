import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useMemo } from "react";
import { useThemeStore } from "../store/themeStore";

const baseTokens = {
  typography: {
    fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700, letterSpacing: "0.03em" },
    h2: { fontSize: "1.75rem", fontWeight: 700 },
    h3: { fontSize: "1.5rem", fontWeight: 700 },
    subtitle1: { fontSize: "1.125rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.95rem" },
  },
  shape: { borderRadius: 24 },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mode = useThemeStore((s) => s.mode);
  const highContrast = useThemeStore((s) => s.highContrast);

  const theme = useMemo(() => {
    const palette = {
      mode,
      primary: { main: "#1976d2", contrastText: "#fff" },
      secondary: { main: "#26a69a", contrastText: "#fff" },
      info: { main: "#0288d1" },
      success: { main: "#43a047" },
      warning: { main: "#ff9800" },
      error: { main: "#e53935" },
      background: {
        default: mode === "light" ? "#f4f7fb" : "#0f172a",
        paper: mode === "light" ? "#ffffff" : "#172033",
      },
      text: {
        primary: mode === "light" ? "#0f172a" : "#e2e8f0",
        secondary: mode === "light" ? "#4b5563" : "#94a3b8",
      },
    };

    const theme = createTheme({
      ...baseTokens,
      palette,
      shape: { borderRadius: 28 },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: palette.background.default,
              color: palette.text.primary,
              transition: "background-color 300ms ease, color 300ms ease",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 24,
              boxShadow:
                mode === "light"
                  ? "0 8px 32px rgba(13, 34, 62, 0.12)"
                  : "0 8px 32px rgba(0, 0, 0, 0.3)",
              transition: "box-shadow 300ms ease",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 999,
              textTransform: "none",
              transition: "all 300ms ease",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 20,
              transition: "all 300ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            },
          },
        },
      },
      typography: {
        fontSize: highContrast ? 16 : 14,
      },
    });

    if (highContrast) {
      // @ts-expect-error highContrast back-compat cast
      theme.shadows = Array.from({ length: 25 }, () => "none");
    }

    return theme;
  }, [mode, highContrast]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
