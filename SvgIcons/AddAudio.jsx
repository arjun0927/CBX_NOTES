import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddAudio(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={26}
      viewBox="0 0 30 26"
      fill="none"
      {...props}
    >
      <Path
        d="M15 2.43c-.99 0-1.94.338-2.641.939-.7.6-1.094 1.414-1.094 2.263v7.47c0 .85.393 1.664 1.094 2.265.7.6 1.65.937 2.641.937.99 0 1.94-.337 2.641-.937.7-.6 1.094-1.415 1.094-2.264v-7.47c0-.85-.393-1.664-1.094-2.264-.7-.6-1.65-.938-2.64-.938z"
        stroke="#606160"
        strokeWidth={2.38589}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.715 10.968v2.135c0 1.981-.918 3.881-2.552 5.282-1.635 1.401-3.852 2.188-6.163 2.188-2.312 0-4.528-.787-6.163-2.188-1.634-1.4-2.552-3.301-2.552-5.282v-2.135M15 20.573v3.202"
        stroke="#606160"
        strokeWidth={2.38589}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default AddAudio
