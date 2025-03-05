import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Drawing(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M22.035 6.269a3.008 3.008 0 10-4.254-4.254L3.54 16.259a2.135 2.135 0 00-.534.886l-1.41 4.644a.533.533 0 00.666.663l4.645-1.408c.334-.102.638-.284.885-.53L22.035 6.269z"
        stroke="#606160"
        strokeWidth={2.13417}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Drawing
