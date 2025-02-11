import React from "react";
import Svg, { Path } from "react-native-svg";

const Noteicon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none" >
      <Path
        d="M13.4908 2.53063H4.75953C4.3385 2.53063 3.93471 2.69789 3.637 2.9956C3.33928 3.29331 3.17203 3.6971 3.17203 4.11813V15.2306C3.17203 15.6517 3.33928 16.0555 3.637 16.3532C3.93471 16.6509 4.3385 16.8181 4.75953 16.8181H15.872C16.2931 16.8181 16.6968 16.6509 16.9946 16.3532C17.2923 16.0555 17.4595 15.6517 17.4595 15.2306V6.49938L13.4908 2.53063Z"
        stroke="#5F6368"
        strokeWidth={1.5875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.697 2.53063V5.70563C12.697 6.12666 12.8643 6.53045 13.162 6.82816C13.4597 7.12588 13.8635 7.29313 14.2845 7.29313H17.4595"
        stroke="#5F6368"
        strokeWidth={1.5875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Noteicon;