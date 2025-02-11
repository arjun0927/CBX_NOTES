import React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const ProfileIcon = ({ width = 20, height = 20, color = "black" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" >
    <G
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Circle cx="12" cy="12" r="10" />
      <Path d="M7.5 17c2.332-2.442 6.643-2.557 9 0m-2.005-7.5c0 1.38-1.12 2.5-2.503 2.5a2.5 2.5 0 0 1-2.504-2.5c0-1.38 1.12-2.5 2.504-2.5a2.5 2.5 0 0 1 2.503 2.5" />
    </G>
  </Svg>
);

export default ProfileIcon;