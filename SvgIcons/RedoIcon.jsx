import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ForwardArrowIcon = ({ size = 20, color = '#ACAEAA' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M12.5 11.6667L16.6667 7.50003L12.5 3.33336"
        stroke={color}
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.6666 7.50002H7.91659C6.70101 7.50002 5.53522 7.9829 4.67568 8.84244C3.81614 9.70198 3.33325 10.8678 3.33325 12.0833C3.33325 12.6852 3.4518 13.2812 3.68214 13.8373C3.91247 14.3934 4.25008 14.8987 4.67568 15.3243C5.53522 16.1838 6.70101 16.6667 7.91659 16.6667H10.8333"
        stroke={color}
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ForwardArrowIcon;
