import React from "react";
import Svg, { Path } from "react-native-svg";

const SpeakerIcon = ({ width = 21, height = 18, color = "#5F6368" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 18" fill="none">
    <Path
      d="M6.82414 10.7786H1.79623C1.24086 10.7786 0.790649 10.3283 0.790649 9.77297V7.25902C0.790649 6.70365 1.24086 6.25344 1.79623 6.25344H6.82414L10.3437 3.73949V13.7953L6.82414 10.7786Z"
      stroke={color}
      strokeWidth={1.58776}
      strokeLinejoin="round"
    />
    <Path
      d="M3.80746 10.7785V15.8064M12.3549 6.25343V11.2813M17.3828 1.22552L14.8689 3.73948M15.8744 8.76738H19.8968M14.8689 13.7953L17.3828 16.3092"
      stroke={color}
      strokeWidth={1.58776}
      strokeLinecap="round"
    />
    <Path d="M13.3607 7.76181V9.77297" stroke={color} strokeWidth={1.58776} strokeLinecap="round" />
  </Svg>
);

export default SpeakerIcon;