import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import getDesignTokens from "./config/theme";
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();
function App() {
  const coreTheme = createTheme(getDesignTokens("light"));
  return (
    <ThemeProvider theme={coreTheme}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
