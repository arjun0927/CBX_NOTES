import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Task(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={19}
      viewBox="0 0 22 19"
      fill="none"
      {...props}
    >
      <Path
        d="M5.39 9.244l3.903 3.902 8.78-9.756m-.488 6.83v5.853m-3.414-2.927h6.341M14.171 2.415l-1.95-.569C7.2.381 2.104 3.92 1.722 9.138v0c-.375 5.128 3.997 9.338 9.107 8.77l3.343-.371"
        stroke="#606160"
        strokeWidth={1.95122}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default Task
