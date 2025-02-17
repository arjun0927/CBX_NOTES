import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ThreeDots(props) {
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
        d="M10 10.833a.833.833 0 100-1.666.833.833 0 000 1.666zM10 5a.833.833 0 100-1.667A.833.833 0 0010 5zM10 16.667A.833.833 0 1010 15a.833.833 0 000 1.667z"
        stroke="#606160"
        strokeWidth={1.81818}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ThreeDots
