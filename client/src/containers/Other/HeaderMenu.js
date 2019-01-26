import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import { gotoBrowser, gotoCreator } from "../../actions";

import { gotoMenu } from "../../actions/index.js";
import UserProfile from "./UserProfile";

import MenuHeader from "../../components/MenuHeader";

let HeaderTitle = ({ onClick }) => (
  <svg onClick={onClick} className="HeaderTitle" viewBox="0 0 211.91 31.17">
    <title>Asset 10</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          className="cls-1"
          d="M7.59,25.19c-1.71,0-5.26-.59-5.26-4.3V12.34H0V10.53H2.33V6.29H4.11v4.24h8.48v1.81H4.11V20.1a2.88,2.88,0,0,0,1.21,2.69A5.5,5.5,0,0,0,8,23.38c2.24,0,4.7-1.15,6.41-1.8l.2,1.77A18.36,18.36,0,0,1,7.59,25.19Z"
        />
        <path
          className="cls-1"
          d="M31,12.34l-9.6,17h2.79v1.8H15.84v-1.8h3.59l3.18-5.43-6-11.6H14.36V10.53h6.28v1.81h-2.1l5,9.83L29,12.34H27.18V10.53h5.89v1.81Z"
        />
        <path
          className="cls-1"
          d="M45,25.19a7,7,0,0,1-5.81-2.66v6.84h5v1.8H34.64v-1.8h2.73v-17H34.64V10.53h4.51v2.3a7.23,7.23,0,0,1,6-2.72,6.75,6.75,0,0,1,6.27,4,8,8,0,0,1,.76,3.45C52.16,22,49,25.19,45,25.19Zm0-13.28a5.53,5.53,0,0,0-5.69,5.69,5.56,5.56,0,1,0,11.11,0C50.35,15.66,49.24,11.91,44.93,11.91Z"
        />
        <path
          className="cls-1"
          d="M53.9,24.8V23h5.78V12.34h-5V10.53h6.81V23h5.68V24.8ZM59.15,7.34v-4h2.34v4Z"
        />
        <path
          className="cls-1"
          d="M78.58,24.8V23h2.7V14.61c0-2.27-1.84-2.7-3.26-2.7a8.26,8.26,0,0,0-5.62,2.7V23h2.73V24.8H67.9V23h2.73V12.37H67.9V10.53h4.5V12.6a9.36,9.36,0,0,1,6.15-2.49,5,5,0,0,1,3.29,1,4.5,4.5,0,0,1,1.21,3.49V23h2.7V24.8Z"
        />
        <path
          className="cls-1"
          d="M102.43,12.34V25.75c0,3.58-2.57,5.42-6.67,5.42a33.58,33.58,0,0,1-7.23-1l.36-1.78a27.28,27.28,0,0,0,6.14,1c4,0,5.62-1,5.62-4V21.25a8,8,0,0,1-6,2.4c-5.19,0-7.62-3.52-7.62-6.71s2.63-6.83,7.65-6.83a8.15,8.15,0,0,1,6,2.33V10.53h3.82v1.81Zm-7.66-.43c-3.16,0-5.92,2-5.92,5,0,2.66,2.5,4.9,5.85,4.9s5.85-2.14,5.85-5C100.55,15.07,99.37,11.91,94.77,11.91Z"
        />
        <path
          className="cls-2"
          d="M124.75,2.29C123.29.77,121.05,0,118.1,0H107.67V25.25H113V15.61h5.63a8.48,8.48,0,0,0,6-2.19,7.5,7.5,0,0,0,2.37-5.74A7.56,7.56,0,0,0,124.75,2.29ZM113,4.55h4.34c1.59,0,2.68.31,3.24.92a3.17,3.17,0,0,1,.87,2.26,3,3,0,0,1-.92,2.32,4,4,0,0,1-2.8.88H113Z"
        />
        <path
          className="cls-3"
          d="M138.49,0h-6.06L124,25.25h4.71l1.91-5.79h8.7l1.95,5.79H147Zm-.61,15h-5.83L135,6.1Z"
        />
        <path
          className="cls-4"
          d="M149.31.24h11a8.23,8.23,0,0,1,5.8,2.06,6.57,6.57,0,0,1,2.23,5c0,2.71-1.4,4.71-4.22,6q1.86.84,3.52,4.53t3.22,7h-6.72c-.4-.81-1.09-2.35-2.09-4.63a14.24,14.24,0,0,0-2.56-4.37,3.32,3.32,0,0,0-2.27-1h-1.76v10h-6.12Zm6.12,4.5v5.59h3.23a3.77,3.77,0,0,0,2.45-.73A2.51,2.51,0,0,0,162,7.52q0-2.77-3.5-2.78Z"
        />
        <polygon
          className="cls-5"
          points="169.94 0 169.94 4.67 176.41 4.67 176.41 25.25 182.03 25.25 182.03 4.67 188.5 4.67 188.5 0 169.94 0"
        />
        <polygon
          className="cls-6"
          points="206.65 0 201.39 9.56 195.88 0 189.5 0 198.14 14.65 198.14 25.25 203.71 25.25 203.71 14.64 211.91 0 206.65 0"
        />
      </g>
    </g>
  </svg>
);

let HeaderMenu = ({ gotoMenu, showMenu, gotoBrowser, gotoCreator }) => (
  <nav className="HeaderMenu">
    <HeaderTitle onClick={gotoMenu} />
    {showMenu && (
      <>
        <MenuHeader gotoBrowser={gotoBrowser} gotoCreator={gotoCreator} />
      </>
    )}
    <UserProfile />
  </nav>
);
HeaderMenu.propTypes = {
  gotoBrowser: PT.func.isRequired,
  gotoCreator: PT.func.isRequired,
  gotoMenu: PT.func.isRequired,
  showMenu: PT.bool.isRequired
};

export default connect(
  () => ({}),
  { gotoMenu, gotoBrowser, gotoCreator }
)(HeaderMenu);
