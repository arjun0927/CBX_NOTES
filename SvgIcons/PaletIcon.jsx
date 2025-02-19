import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

const CustomIcon = ({ size = 21, color = '#606160' }) => {
  return (
    <Svg width={size} height={(size * 20) / 21} viewBox="0 0 21 20" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          d="M11.8125 5.83338C12.0541 5.83338 12.25 5.64683 12.25 5.41671C12.25 5.18659 12.0541 5.00005 11.8125 5.00005C11.5709 5.00005 11.375 5.18659 11.375 5.41671C11.375 5.64683 11.5709 5.83338 11.8125 5.83338Z"
          fill={color}
          stroke={color}
          strokeWidth="2.00215"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.3125 9.16675C15.5541 9.16675 15.75 8.98021 15.75 8.75009C15.75 8.51997 15.5541 8.33342 15.3125 8.33342C15.0709 8.33342 14.875 8.51997 14.875 8.75009C14.875 8.98021 15.0709 9.16675 15.3125 9.16675Z"
          fill={color}
          stroke={color}
          strokeWidth="2.00215"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.4375 6.66674C7.67912 6.66674 7.875 6.48019 7.875 6.25007C7.875 6.01995 7.67912 5.8334 7.4375 5.8334C7.19588 5.8334 7 6.01995 7 6.25007C7 6.48019 7.19588 6.66674 7.4375 6.66674Z"
          fill={color}
          stroke={color}
          strokeWidth="2.00215"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.6875 10.8334C5.92912 10.8334 6.125 10.6469 6.125 10.4167C6.125 10.1866 5.92912 10.0001 5.6875 10.0001C5.44588 10.0001 5.25 10.1866 5.25 10.4167C5.25 10.6469 5.44588 10.8334 5.6875 10.8334Z"
          fill={color}
          stroke={color}
          strokeWidth="2.00215"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.5 1.6667C5.6875 1.6667 1.75 5.4167 1.75 10C1.75 14.5834 5.6875 18.3334 10.5 18.3334C11.3102 18.3334 11.942 17.7117 11.942 16.9267C11.942 16.5625 11.7845 16.2309 11.5596 15.9892C11.3059 15.7484 11.1764 15.4459 11.1764 15.0517C11.1731 14.8683 11.2085 14.6861 11.2807 14.5161C11.3529 14.346 11.4603 14.1915 11.5965 14.0618C11.7327 13.9321 11.8949 13.8298 12.0734 13.7611C12.252 13.6923 12.4433 13.6585 12.6359 13.6617H14.3824C17.052 13.6617 19.243 11.5759 19.243 9.03337C19.2194 5.01004 15.2784 1.6667 10.5 1.6667Z"
          stroke={color}
          strokeWidth="2.00215"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="21" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CustomIcon;
