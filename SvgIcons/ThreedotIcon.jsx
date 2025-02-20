import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CustomDotsIcon = ({ size = 20, color = '#606160' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.0001 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99996C10.8334 9.53972 10.4603 9.16663 10.0001 9.16663C9.53984 9.16663 9.16675 9.53972 9.16675 9.99996C9.16675 10.4602 9.53984 10.8333 10.0001 10.8333Z"
        stroke={color}
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.0001 4.99998C10.4603 4.99998 10.8334 4.62688 10.8334 4.16665C10.8334 3.70641 10.4603 3.33331 10.0001 3.33331C9.53984 3.33331 9.16675 3.70641 9.16675 4.16665C9.16675 4.62688 9.53984 4.99998 10.0001 4.99998Z"
        stroke={color}
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.0001 16.6667C10.4603 16.6667 10.8334 16.2936 10.8334 15.8334C10.8334 15.3731 10.4603 15 10.0001 15C9.53984 15 9.16675 15.3731 9.16675 15.8334C9.16675 16.2936 9.53984 16.6667 10.0001 16.6667Z"
        stroke={color}
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CustomDotsIcon;
