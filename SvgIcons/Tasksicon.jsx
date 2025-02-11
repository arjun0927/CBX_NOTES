import React from "react";
import Svg, { Path } from "react-native-svg";

const CheckMarkIcon = ({ width = 21, height = 19, color = "#5F6368" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 19" fill="none">
    <Path
      d="M5.04141 9.1664L8.81982 12.9448L17.3212 3.4988M16.8489 10.111V15.7786M13.5428 12.9448H19.6827M13.5428 2.5542L11.6559 2.00384C6.79249 0.585347 1.85909 4.01128 1.48939 9.06382V9.06382C1.1261 14.0287 5.35853 18.1049 10.3063 17.5551L13.5428 17.1955"
      stroke={color}
      strokeWidth={1.8892}
      strokeLinecap="round"
    />
  </Svg>
);

export default CheckMarkIcon;