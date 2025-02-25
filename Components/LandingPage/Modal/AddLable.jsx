import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddLable(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={14}
      viewBox="0 0 22 17"
      fill="none"
      {...props}
    >
      <Path
        d="M21.33 8.72l-4.974 7.033c-.21.305-.481.543-.815.715a2.31 2.31 0 01-1.072.257H3.035a2.202 2.202 0 01-1.616-.672 2.202 2.202 0 01-.671-1.615V3.003c0-.628.224-1.167.671-1.615A2.202 2.202 0 013.035.717h11.434c.381 0 .739.085 1.072.257.334.171.605.41.815.714l4.974 7.033zm-2.802 0L14.47 3.004H3.035v11.435h11.434l4.06-5.717zm-15.493 0v5.718V3.003v5.718z"
        fill="#598931"
      />
    </Svg>
  )
}

export default AddLable
