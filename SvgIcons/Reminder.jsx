import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Reminder(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_212_3500)"
        stroke="#598931"
        strokeWidth={2.13444}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M19.629 14.568c.782 1.565 1.663 2.152 1.663 2.152H3.682s2.935-1.956 2.935-8.804c0-3.229 2.642-5.87 5.87-5.87.978 0 1.859.196 2.74.685M10.824 20.634a1.898 1.898 0 003.326 0M15.422 7.916h5.87M18.357 4.98v5.87" />
      </G>
      <Defs>
        <ClipPath id="clip0_212_3500">
          <Path
            fill="#fff"
            transform="translate(.748 .09)"
            d="M0 0H23.4789V23.4789H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Reminder
