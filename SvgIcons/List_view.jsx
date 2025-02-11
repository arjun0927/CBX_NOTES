import React from "react";
import Svg, { Path } from "react-native-svg";

const MenuIcon = ({ width = 18, height = 19, color = "#464646" }) => (
  <Svg width={width} height={height} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M15 1.76355H3C2.17157 1.76355 1.5 2.43512 1.5 3.26355V6.26355C1.5 7.09198 2.17157 7.76355 3 7.76355H15C15.8284 7.76355 16.5 7.09198 16.5 6.26355V3.26355C16.5 2.43512 15.8284 1.76355 15 1.76355Z"
      stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
    />
    <Path
      d="M15 10.7635H3C2.17157 10.7635 1.5 11.4351 1.5 12.2635V15.2635C1.5 16.092 2.17157 16.7635 3 16.7635H15C15.8284 16.7635 16.5 16.092 16.5 15.2635V12.2635C16.5 11.4351 15.8284 10.7635 15 10.7635Z"
      stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
    />
  </Svg>
);

export default MenuIcon;