import * as React from "react"
import Svg, { Path } from "react-native-svg"

function List_View2(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <Path
        d="M6.75 2.75H3a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75h3.75a.75.75 0 00.75-.75V3.5a.75.75 0 00-.75-.75zM15 2.75h-3.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V3.5a.75.75 0 00-.75-.75zM15 11h-3.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75H15a.75.75 0 00.75-.75v-3.75A.75.75 0 0015 11zM6.75 11H3a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75h3.75a.75.75 0 00.75-.75v-3.75a.75.75 0 00-.75-.75z"
        stroke="#464646"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default List_View2;
