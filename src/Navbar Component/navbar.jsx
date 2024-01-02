import React, { useState } from "react";
import navStyles from "./NavBar.module.css";
function Navbar() {
  const [themeMode, setThemeMode] = useState(true);

  return (
    <nav id={navStyles.navbar__container}>
      <ul id={navStyles.header__menu}>
        <li>Fruits</li>
        <li>About</li>
        <li id={navStyles.theme}>Theme</li>
      </ul>
    </nav>
  );
}

export default Navbar;
