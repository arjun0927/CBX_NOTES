import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Star(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={11}
      viewBox="0 0 9 9"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_212_3195)">
        <Path
          d="M4.616 1.197a.168.168 0 01.301 0l.734 1.485a.674.674 0 00.506.368l1.64.24a.168.168 0 01.093.287L6.704 4.732a.674.674 0 00-.194.597l.28 1.631a.168.168 0 01-.244.178l-1.466-.77a.674.674 0 00-.627 0l-1.465.77a.168.168 0 01-.245-.178l.28-1.631a.674.674 0 00-.194-.597L1.643 3.578a.168.168 0 01.093-.288l1.64-.24a.674.674 0 00.507-.368l.733-1.485z"
          stroke="#000"
          strokeWidth={0.634921}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_212_3195">
          <Path
            fill="#fff"
            transform="translate(.957 .468)"
            d="M0 0H7.61905V7.61905H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Star
