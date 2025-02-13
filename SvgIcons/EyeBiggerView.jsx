import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EyeBiggerView(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={22}
      viewBox="0 0 23 22"
      fill="none"
      {...props}
    >
      <Path
        d="M2.402 11.32a.917.917 0 010-.639 9.854 9.854 0 0118.22 0 .917.917 0 010 .638 9.855 9.855 0 01-18.22 0z"
        stroke="#606160"
        strokeWidth={2.00456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.512 13.75a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z"
        stroke="#606160"
        strokeWidth={2.00456}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default EyeBiggerView
