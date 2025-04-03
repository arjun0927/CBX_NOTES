import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DatePicker(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      {...props}
    >
      <Path
        d="M5.667 1.417V4.25M11.333 1.417V4.25M14.875 9.208V4.25a1.417 1.417 0 00-1.417-1.417H3.542A1.417 1.417 0 002.125 4.25v9.917a1.417 1.417 0 001.417 1.416h5.666M2.125 7.083h12.75M11.333 13.458h4.25M13.458 11.333v4.25"
        stroke={props.stroke}
        strokeWidth={1.41667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DatePicker
