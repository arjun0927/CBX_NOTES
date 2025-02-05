import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightLineSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={92}
      height={2}
      viewBox="0 0 92 2"
      fill="none"
      {...props}
    >
      <Path d="M.063 1.125h91.25" stroke="#EEE" strokeWidth={0.625} />
    </Svg>
  )
}

export default RightLineSvg
