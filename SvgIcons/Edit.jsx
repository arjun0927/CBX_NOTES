import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function Edit(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Rect width={24} height={24} rx={12} fill="#fff" />
      <Path
        d="M16.586 9.406a1.41 1.41 0 00-1.993-1.993l-6.672 6.674a1 1 0 00-.25.415l-.66 2.175a.25.25 0 00.31.311l2.177-.66a1 1 0 00.415-.248l6.673-6.674zM13.5 8.5l2 2"
        stroke="#000"
        strokeWidth={0.999928}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Edit
