import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BackArrowIcon = ({ size = 20, color = '#ACAEAA' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.49992 11.6667L3.33325 7.50003L7.49992 3.33336"
        stroke={color}
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.33325 7.50002H12.0833C12.6851 7.50002 13.2811 7.61857 13.8372 7.8489C14.3933 8.07924 14.8986 8.41684 15.3242 8.84244C15.7498 9.26804 16.0874 9.77331 16.3177 10.3294C16.548 10.8855 16.6666 11.4815 16.6666 12.0833C16.6666 12.6852 16.548 13.2812 16.3177 13.8373C16.0874 14.3934 15.7498 14.8987 15.3242 15.3243C14.8986 15.7499 14.3933 16.0875 13.8372 16.3178C13.2811 16.5481 12.6851 16.6667 12.0833 16.6667H9.16659"
        stroke={color}
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BackArrowIcon;
