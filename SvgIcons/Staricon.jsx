import React from "react";
import Svg, { Path } from "react-native-svg";

const StarIcon = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={19} height={18} viewBox="0 0 19 18" fill="none" {...props}>
      <Path
        d="M9.31719 1.73562L11.7703 6.70531L17.256 7.50712L13.2866 11.3733L14.2234 16.8352L9.31719 14.2551L4.41101 16.8352L5.34779 11.3733L1.37839 7.50712L6.8641 6.70531L9.31719 1.73562Z"
        stroke="#5F6368"
        strokeWidth={1.58776}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default StarIcon;