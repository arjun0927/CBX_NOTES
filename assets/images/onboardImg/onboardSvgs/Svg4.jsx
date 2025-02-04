import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function Svg4(props) {
  const { color = "#598931" } = props; // Default color is #598931 if not passed as a prop

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={17}
      viewBox="0 0 18 17"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_217_4892)"
        stroke={color}
        strokeWidth={1.68206}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M3.647 7.117c-.745 0-1.355-.61-1.355-1.355v-2.71c0-.745.61-1.355 1.355-1.355h2.71c.745 0 1.355.61 1.355 1.355M7.712 11.182c-.745 0-1.355-.61-1.355-1.355v-2.71c0-.745.61-1.355 1.355-1.355h2.71c.745 0 1.355.61 1.355 1.355M14.487 9.827h-2.71c-.749 0-1.355.607-1.355 1.355v2.71c0 .749.606 1.355 1.355 1.355h2.71c.748 0 1.355-.606 1.355-1.355v-2.71c0-.748-.607-1.355-1.355-1.355z" />
      </G>
      <Defs>
        <ClipPath id="clip0_217_4892">
          <Path
            fill="#fff"
            transform="translate(.937 .342)"
            d="M0 0H16.2599V16.2599H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Svg4;
