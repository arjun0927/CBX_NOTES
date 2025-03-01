import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ColorLabel(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill="none"
      {...props}
    >
      <Path
        d="M6 3a.2.2 0 100-.4.2.2 0 000 .4zM7.6 4.6a.2.2 0 100-.4.2.2 0 000 .4zM4 3.4A.2.2 0 104 3a.2.2 0 000 .4zM3.2 5.4a.2.2 0 100-.4.2.2 0 000 .4z"
        fill="#5F6368"
        stroke="#5F6368"
        strokeWidth={0.872727}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.4 1c-2.2 0-4 1.8-4 4s1.8 4 4 4a.66.66 0 00.66-.675.685.685 0 00-.176-.45.601.601 0 01-.175-.45.656.656 0 01.667-.667h.799a2.23 2.23 0 002.222-2.222C9.386 2.605 7.584 1 5.4 1z"
        stroke="#5F6368"
        strokeWidth={0.872727}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ColorLabel
