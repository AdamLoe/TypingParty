import React from "react";
import { Link } from "react-router-dom";

let Header = () => (
  <ul>
    <li>
      <Link to={"/"}>Home </Link>
      <Link to={"/settings"}>Settings </Link>
    </li>
  </ul>
);

export default Header;
