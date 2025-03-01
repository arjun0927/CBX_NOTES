import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function NotificationBell(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={21}
      viewBox="0 0 22 21"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_243_5630)"
        stroke="#464646"
        strokeWidth={1.71965}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9.636 18.308a1.72 1.72 0 002.979 0M19.724 7.13c0-1.977-.688-3.697-1.72-5.159M3.612 13.43a.86.86 0 00.635 1.439h13.757a.86.86 0 00.636-1.439c-1.143-1.178-2.356-2.431-2.356-6.3a5.159 5.159 0 10-10.317 0c0 3.869-1.214 5.122-2.355 6.3zM4.247 1.971c-1.032 1.462-1.72 3.182-1.72 5.16" />
      </G>
      <Defs>
        <ClipPath id="clip0_243_5630">
          <Path
            fill="#fff"
            transform="translate(.808 .252)"
            d="M0 0H20.6358V20.6358H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default NotificationBell
