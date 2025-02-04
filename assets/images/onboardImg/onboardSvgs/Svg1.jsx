import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Svg1(props) {
  const { color = "#598931" } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M3.888 18.052h10.899a1.557 1.557 0 001.557-1.557V6.375L12.45 2.481H5.445a1.557 1.557 0 00-1.557 1.557v1.557"
        stroke={color}
        strokeWidth={1.33456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.673 2.482v3.114a1.557 1.557 0 001.557 1.557h3.114M3.109 14.937a.779.779 0 100-1.557.779.779 0 000 1.557z"
        stroke={color}
        strokeWidth={1.33456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.33 14.159v-2.336a3.114 3.114 0 116.228 0v2.336"
        stroke={color}
        strokeWidth={1.33456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.78 14.937a.779.779 0 100-1.557.779.779 0 000 1.557z"
        stroke={color}
        strokeWidth={1.33456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Svg1;
