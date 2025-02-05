import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EmailIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={15}
      viewBox="0 0 18 15"
      fill="none"
      {...props}
    >
      <Path
        d="M14.824 1.57H2.964c-.818 0-1.482.664-1.482 1.483v8.894c0 .819.664 1.483 1.483 1.483h11.859c.819 0 1.482-.664 1.482-1.483V3.053c0-.819-.663-1.483-1.482-1.483z"
        stroke="#D1D1D1"
        strokeWidth={1.48238}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default EmailIcon
