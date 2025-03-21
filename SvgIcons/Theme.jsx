import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Theme(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_561_22)"
        stroke="#606160"
        strokeWidth={2.00215}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M11.813 5.833a.427.427 0 00.437-.416.427.427 0 00-.438-.417.427.427 0 00-.437.417c0 .23.196.416.438.416zM15.313 9.167a.427.427 0 00.437-.417.427.427 0 00-.438-.417.427.427 0 00-.437.417c0 .23.196.417.438.417zM7.438 6.667a.427.427 0 00.437-.417.427.427 0 00-.438-.417A.427.427 0 007 6.25c0 .23.196.417.438.417zM5.688 10.834a.428.428 0 00.437-.417.428.428 0 00-.438-.417.428.428 0 00-.437.417c0 .23.196.417.438.417z"
          fill="#606160"
        />
        <Path d="M10.5 1.667c-4.812 0-8.75 3.75-8.75 8.333s3.938 8.333 8.75 8.333c.81 0 1.442-.621 1.442-1.406a1.39 1.39 0 00-.382-.938c-.254-.24-.383-.543-.383-.937a1.31 1.31 0 01.104-.536c.072-.17.18-.325.316-.454.136-.13.298-.232.477-.3a1.5 1.5 0 01.562-.1h1.747c2.67 0 4.86-2.086 4.86-4.629C19.22 5.01 15.28 1.667 10.5 1.667z" />
      </G>
      <Defs>
        <ClipPath id="clip0_561_22">
          <Path fill="#fff" d="M0 0H21V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Theme
