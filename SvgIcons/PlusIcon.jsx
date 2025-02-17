import React from "react";
import Svg, { Path } from "react-native-svg";

const PlusIcon = ({ width, height, color }) => (
  <Svg width={width} height={height} viewBox="0 0 30 30" fill="none" >
    <Path
      d="M6.25 15H23.75"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 6.25V23.75"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
