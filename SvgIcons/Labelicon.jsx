import React from "react";
import Svg, { Path } from "react-native-svg";

const CustomIcon = ({ width = 24, height = 25, fill = "#5F6368" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 25" fill="none">
    <Path
      d="M4 20.0146C3.45 20.0146 2.97917 19.8188 2.5875 19.4271C2.19583 19.0355 2 18.5646 2 18.0146V6.01465C2 5.46465 2.19583 4.99382 2.5875 4.60215C2.97917 4.21048 3.45 4.01465 4 4.01465H15C15.3167 4.01465 15.6167 4.08548 15.9 4.22715C16.1833 4.36882 16.4167 4.56465 16.6 4.81465L22 12.0146L16.6 19.2146C16.4167 19.4646 16.1833 19.6605 15.9 19.8021C15.6167 19.9438 15.3167 20.0146 15 20.0146H4ZM4 18.0146H15L19.5 12.0146L15 6.01465H4V18.0146Z"
      fill={fill}
    />
  </Svg>
);

export default CustomIcon;