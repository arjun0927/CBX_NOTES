import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Undo(props) {
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
        d="M7.5 11.667L3.333 7.5 7.5 3.333"
        stroke="#606160"
        strokeWidth={1.81818}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.333 7.5h8.75a4.583 4.583 0 010 9.167H9.167"
        stroke="#606160"
        strokeWidth={1.81818}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Undo
