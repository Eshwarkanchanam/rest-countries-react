import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  let theme = useContext(ThemeContext);
  return (
    <div
      className={`mx-auto flex flex-col ${theme === "dark" && "text-white"}`}
    >
      <h1 className="text-2xl font-bold mx-auto my-10">404 Page Not Found</h1>
      <Link to={"/"} className="mx-auto">
        <button className="py-2 px-4 text-lg shadow-xl border-2 rounded ">
          Get Back To Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
