import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Share(props) {
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
        d="M7.2 3.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM2.4 6.2a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM7.2 9a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM3.436 5.604l2.732 1.592M6.164 2.804L3.436 4.396"
        stroke="#5F6368"
        strokeWidth={0.800004}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Share
