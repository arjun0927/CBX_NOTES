import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Redo(props) {
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
        d="M12.5 11.667L16.667 7.5 12.5 3.333"
        stroke="#606160"
        strokeWidth={1.81818}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.667 7.5h-8.75a4.583 4.583 0 000 9.167h2.916"
        stroke="#606160"
        strokeWidth={1.81818}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Redo
