import React, { useState } from "react";
import navStyles from "./NavBar.module.css";
import propTypes from "prop-types";

function Navbar(props) {
  const [DarkTheme, setDarkTheme] = useState(true);
  const rootElement = document.getElementById("root");

  return (
    <nav id={navStyles.navbar__container}>
      <ul id={navStyles.header__menu}>
        <li>Fruits</li>
        <li>About</li>
        <li
          onClick={(e) => {
            //DarkTheme == true; white theme
            if (DarkTheme) {
              console.log("Dark Theme disabled", DarkTheme, e);
              rootElement.style.backgroundColor = "#fff";
              document.getElementsByClassName(props.Classes)[all].style.color =
                "black";
              setDarkTheme(false);
              //themeMode == false; dark theme
            } else if (!DarkTheme) {
              rootElement.style.backgroundColor = "rgb(7, 10, 18)";
              document.getElementsByClassName(props.Classes)[0].style.color =
                "rgba(255, 255, 255, 0.87)";
              setDarkTheme(true);
            }
          }}
        >
          Theme
        </li>
      </ul>
    </nav>
  );
}
Navbar.propTypes = {
  Classes: propTypes.string.isRequired,
};

export default Navbar;
