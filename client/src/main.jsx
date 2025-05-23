import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App.jsx";

const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#111",
    text: "#fff",
    success: "#00bba3",
    error: "#ff4e50",
  },
};

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
