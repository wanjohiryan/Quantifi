import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps{
    color:string;
    fill?: boolean;
}

function SvgComponent({color, fill}:IconProps) {
  const fillColor = fill ? color : "none";
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M0 0h24v24H0z"  stroke="none" />
      <Path fill={fillColor} d="M19.5 13.572L12 21l-7.5-7.428m0 0A5 5 0 1112 7.006a5 5 0 117.5 6.572" />
    </Svg>
  )
}

export default SvgComponent