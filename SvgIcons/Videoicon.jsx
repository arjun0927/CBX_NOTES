import React from "react";
import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

const VideoPlayIcon = ({ width = 20, height = 20, color = "#5F6368" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0)">
      <Path
        d="M13.4928 11.1429L17.6392 13.9072C17.699 13.9469 17.7684 13.9697 17.8401 13.9732C17.9119 13.9766 17.9832 13.9605 18.0465 13.9266C18.1098 13.8927 18.1627 13.8423 18.1996 13.7807C18.2365 13.7191 18.256 13.6487 18.256 13.5769V7.07026C18.2561 7.00042 18.2377 6.9318 18.2027 6.87135C18.1677 6.8109 18.1174 6.76074 18.0568 6.72595C17.9963 6.69116 17.9276 6.67297 17.8578 6.6732C17.7879 6.67344 17.7194 6.6921 17.659 6.7273L13.4928 9.15816"
        stroke={color}
        strokeWidth={2.38164}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9049 5.58568H3.96615C3.08925 5.58568 2.37839 6.29654 2.37839 7.17344V13.5245C2.37839 14.4014 3.08925 15.1122 3.96615 15.1122H11.9049C12.7818 15.1122 13.4927 14.4014 13.4927 13.5245V7.17344C13.4927 6.29654 12.7818 5.58568 11.9049 5.58568Z"
        stroke={color}
        strokeWidth={2.38164}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="19.0531" height="19.0531" fill="white" transform="translate(0.79071 0.822388)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default VideoPlayIcon;