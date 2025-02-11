import React from "react";
import Svg, { Rect } from "react-native-svg";

const Elst = ({ width = 252, height = 152, color = "#ECECEC" }) => (
  <Svg width={width} height={height} viewBox="0 0 252 152" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect x="12.593" y="0.449131" width="221.898" height="40.8189" rx="20.4094" fill={color} />
    <Rect x="21.278" y="111.181" width="207.134" height="40.8189" rx="20.4094" fill={color} />
    <Rect x="0" y="57.335" width="251.427" height="65.1365" rx="30.397" fill={color} />
  </Svg>
);

export default Elst;