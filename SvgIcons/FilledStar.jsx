import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FilledStar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={13}
      viewBox="0 0 9 9"
      fill="none"
      {...props}
    >
      <Path
        d="M4.616 1.197a.168.168 0 01.301 0l.734 1.486a.674.674 0 00.506.368l1.64.24a.168.168 0 01.093.287L6.704 4.733a.674.674 0 00-.194.596l.28 1.632a.168.168 0 01-.244.177l-1.466-.77a.674.674 0 00-.627 0l-1.466.77a.168.168 0 01-.244-.177l.28-1.632a.674.674 0 00-.194-.596L1.643 3.578a.168.168 0 01.093-.288l1.64-.24a.674.674 0 00.507-.367l.733-1.486z"
        fill="#000"
      />
    </Svg>
  )
}

export default FilledStar
