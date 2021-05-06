import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

interface IconProps{
    color:string;
};

function Music({color}:IconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Circle cx={6} cy={17} r={3} />
      <Circle cx={16} cy={17} r={3} />
      <Path d="M9 17V4h10v13M9 8h10" />
    </Svg>
  )
}

export default Music