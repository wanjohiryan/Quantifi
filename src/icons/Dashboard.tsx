/**@flow */
import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

interface IconProps{
    color?:string;
}

function Dashboard ({color}:IconProps) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 35 35"
      strokeWidth={2}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Rect x={4} y={4} width={6} height={6} rx={1} />
      <Path d="M15 18h5" />
      <Rect x={4} y={14} width={6} height={6} rx={1} />
      <Rect x={14} y={4} width={6} height={6} rx={1} />
      <Path d="M15 15h5" />
    </Svg>
  )
}

export default Dashboard