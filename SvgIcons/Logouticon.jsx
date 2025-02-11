import React from "react";
import Svg, { Path } from "react-native-svg";

const LogoutIcon = ({ width = 20, height = 20, color = "#5F6368" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      d="M7.9357 17.331H4.76018C4.33908 17.331 3.93523 17.1637 3.63747 16.866C3.33971 16.5682 3.17242 16.1643 3.17242 15.7432V4.62893C3.17242 4.20783 3.33971 3.80397 3.63747 3.50621C3.93523 3.20845 4.33908 3.04117 4.76018 3.04117H7.9357"
      stroke={color}
      strokeWidth={2.38164}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.4928 14.1555L17.4622 10.1861L13.4928 6.21669"
      stroke={color}
      strokeWidth={2.38164}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M17.4623 10.1861H7.93573" stroke={color} strokeWidth={2.38164} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default LogoutIcon;