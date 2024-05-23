import React, { useState } from "react";
import "./style/dark-style.css";
import "./styles/light-style.css";

const DarkModeToggle = () => {
  const [styleSheet, setStyleSheet] = useState("styles1");

  const toggleStyle = () => {
    setStyleSheet((prevStyleSheet) =>
      prevStyleSheet === "styles1" ? "styles2" : "styles1"
    );
  };

  return (
    <button
      className={`button ${styleSheet === "styles1" ? "styles1" : "styles2"}`}
      onClick={toggleStyle}
    >
      Toggle Style
    </button>
  );
};

export default DarkModeToggle;
