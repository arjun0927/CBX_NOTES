import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Svg2(props) {
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
        d="M16.954 2.885H2.941a.779.779 0 00-.778.779v2.335c0 .43.348.779.778.779h14.013c.43 0 .779-.349.779-.779V3.664a.778.778 0 00-.779-.779z"
        stroke={color}
        strokeWidth={1.33456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.72 6.777v8.564a1.557 1.557 0 001.557 1.557h1.557M16.176 6.777v8.564a1.557 1.557 0 01-1.557 1.557h-1.557M7.613 12.226L9.948 9.89l2.335 2.336M9.948 9.89v7.007"
        stroke={color}
        strokeWidth={1.33456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Svg2;
