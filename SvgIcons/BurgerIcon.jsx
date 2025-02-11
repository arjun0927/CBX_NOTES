import React from "react";
import Svg, { Path } from "react-native-svg";

const MenuIcon = ({ width = 24, height = 24, color = "#464646" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 25" fill="none">
    <Path d="M4 12.2635H20" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4 6.26355H20" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4 18.2635H20" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default MenuIcon;