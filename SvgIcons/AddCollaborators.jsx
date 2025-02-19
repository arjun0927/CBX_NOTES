import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function AddCollaborators(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_212_3490)"
        stroke="#598931"
        strokeWidth={2.13444}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M2.704 21.03a7.827 7.827 0 0113.004-5.87M10.53 13.204a4.891 4.891 0 100-9.783 4.891 4.891 0 000 9.783zM19.335 16.138v5.87M22.27 19.073H16.4" />
      </G>
      <Defs>
        <ClipPath id="clip0_212_3490">
          <Path
            fill="#fff"
            transform="translate(.748 .486)"
            d="M0 0H23.4789V23.4789H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default AddCollaborators
