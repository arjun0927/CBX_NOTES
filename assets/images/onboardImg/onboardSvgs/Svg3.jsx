import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function Svg3(props) {
  const { color = "#598931" } = props;
  
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_217_4884)"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M7.816 10.696l1.25 1.25a1.327 1.327 0 001.877-1.876"
          strokeWidth={1.03512}
        />
        <Path
          d="M9.692 8.82l1.564 1.563a1.327 1.327 0 001.876-1.876L10.705 6.08a1.876 1.876 0 00-2.651 0l-.55.55a1.327 1.327 0 01-1.877-1.875l1.758-1.758a3.62 3.62 0 014.415-.544l.294.175c.266.16.583.217.888.157l1.088-.22"
          strokeWidth={1.55267}
        />
        <Path
          d="M14.07 1.94l.625 6.88h-1.25M2.813 1.94l-.625 6.88 4.065 4.064a1.327 1.327 0 001.876-1.876M2.813 2.566h5.003"
          strokeWidth={1.55267}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_217_4884">
          <Path
            fill="#fff"
            transform="translate(.937 .064)"
            d="M0 0H15.0092V15.0092H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Svg3;
