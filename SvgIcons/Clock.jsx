import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Clock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_223_999)"
        stroke="#4E4E4E"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M7.5 13.858a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5z" />
        <Path d="M7.5 3.858v3.75l2.5 1.25" />
      </G>
      <Defs>
        <ClipPath id="clip0_223_999">
          <Path fill="#fff" transform="translate(0 .108)" d="M0 0H15V15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Clock
