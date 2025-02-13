import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DownArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      {...props}
    >
      <Path
        d="M4.458 5.95l3.786 3.339 3.785-3.34"
        stroke="#fff"
        strokeWidth={1.13953}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DownArrow
