import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Pin(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={11}
      viewBox="0 0 9 9"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_212_3197)"
        stroke="#000"
        strokeWidth={0.634921}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M4.56 5.865v1.587M3.608 3.884a.635.635 0 01-.353.568l-.565.286a.635.635 0 00-.352.568v.242a.317.317 0 00.317.317h3.81a.317.317 0 00.317-.317v-.242a.635.635 0 00-.352-.568l-.565-.286a.635.635 0 01-.352-.568V2.69a.317.317 0 01.317-.317.635.635 0 100-1.27H3.29a.635.635 0 100 1.27.317.317 0 01.318.317v1.194z" />
      </G>
      <Defs>
        <ClipPath id="clip0_212_3197">
          <Path
            fill="#fff"
            transform="translate(.75 .468)"
            d="M0 0H7.61905V7.61905H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Pin
