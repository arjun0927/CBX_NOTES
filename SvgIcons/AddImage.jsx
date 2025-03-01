import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddImage(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      {...props}
    >
      <Path
        d="M19.129 1.72H3.819c-1.207 0-2.187.979-2.187 2.186v15.31c0 1.208.98 2.187 2.188 2.187h15.309c1.208 0 2.187-.98 2.187-2.187V3.906c0-1.207-.98-2.187-2.187-2.187z"
        stroke="#606160"
        strokeWidth={2.38589}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.194 10.467a2.187 2.187 0 100-4.374 2.187 2.187 0 000 4.374zM21.316 14.842l-3.374-3.375a2.187 2.187 0 00-3.093 0l-9.936 9.936"
        stroke="#606160"
        strokeWidth={2.38589}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default AddImage
