import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const ShowMessage = ({ message = "No data found", textColor = "" }) => {
  let theme = useContext(ThemeContext);
  return (
    <div
      className={`text-2xl text-center my-20 mx-auto ${
        theme === "dark" && "text-white"
      } ${textColor && textColor}`}
      id="no-data-message"
    >
      <p>{message}</p>
    </div>
  );
};

export default ShowMessage;
