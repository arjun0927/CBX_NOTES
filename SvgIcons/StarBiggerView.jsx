import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StarBiggerView(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <Path
        d="M10.565 2.104a.485.485 0 01.87 0l2.118 4.289a1.946 1.946 0 001.462 1.063l4.735.693a.486.486 0 01.27.829l-3.425 3.335a1.947 1.947 0 00-.56 1.721l.809 4.712a.486.486 0 01-.707.513l-4.233-2.225a1.944 1.944 0 00-1.809 0l-4.232 2.225a.486.486 0 01-.706-.513l.808-4.71a1.945 1.945 0 00-.56-1.723L1.98 8.979a.486.486 0 01.27-.83l4.734-.693a1.945 1.945 0 001.464-1.063l2.117-4.29z"
        stroke="#606160"
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default StarBiggerView
