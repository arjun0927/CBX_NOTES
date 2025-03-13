import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Aa(props) {
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
        d="M21 14h-5M16 16v-3.5a2.5 2.5 0 015 0V16M4.5 13h6M3 16l4.5-9 4.5 9"
        stroke="#CFCFCF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Aa
