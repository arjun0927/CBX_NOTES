import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddCheckbox(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <Path
        d="M21.135 5.653h-5.113c-.564 0-1.022.458-1.022 1.023v5.112c0 .565.458 1.023 1.023 1.023h5.112c.565 0 1.023-.458 1.023-1.023V6.676c0-.565-.458-1.023-1.023-1.023zM21.135 17.583h-5.113c-.564 0-1.022.457-1.022 1.022v5.113c0 .564.458 1.022 1.023 1.022h5.112c.565 0 1.023-.457 1.023-1.022v-5.113c0-.565-.458-1.022-1.023-1.022zM3.07 9.232h8.351M3.07 21.161h8.351"
        stroke="#606160"
        strokeWidth={2.38589}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default AddCheckbox
