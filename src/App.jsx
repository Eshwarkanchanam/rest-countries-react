import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ThemeContext from "./contexts/ThemeContext";
import HomePage from "./components/HomePage";
import ThemeProvider from "./contexts/ThemeProvider";
import DetailCountryPage from "./components/DetailCountryPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

let router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage />,
    errorElement:<ErrorPage />
  },
  {
    path:'/country/:cca3',
    element:<DetailCountryPage />
  }
]);

export default function App() {
  let [theme, setTheme] = useState(useContext(ThemeContext));

  return (
    <ThemeProvider theme={theme === "light" ? "light" : "dark"}>
      <div className={`${theme === "dark" && "bg-slate-900"} min-h-screen`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}
