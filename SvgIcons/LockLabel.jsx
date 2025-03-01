import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LockLabel(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={9}
      height={10}
      viewBox="0 0 9 10"
      fill="none"
      {...props}
    >
      <Path
        d="M4.6 7a.4.4 0 100-.8.4.4 0 000 .8z"
        stroke="#5F6368"
        strokeWidth={0.800004}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.4 4.2H1.8A.8.8 0 001 5v3.2a.8.8 0 00.8.8h5.6a.8.8 0 00.8-.8V5a.8.8 0 00-.8-.8zM2.6 4.2V3a2 2 0 114 0v1.2"
        stroke="#5F6368"
        strokeWidth={0.800004}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LockLabel
