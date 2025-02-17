import React from "react";
import Svg, { Path } from "react-native-svg";

const CloseIcon = ({ width = 44, height = 44, stroke = "white" }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 44 44" fill="none">
      <Path d="M15.8127 15.8128L28.1871 28.1872" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M28.1873 15.8128L15.8129 28.1872" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default CloseIcon;
