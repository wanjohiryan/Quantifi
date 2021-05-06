import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

interface IconProps{
    color?:string;
}

function Video ({color}:IconProps){
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
      <Rect x={3} y={6} width={12} height={12} rx={2} />
      <Path
        d="M6.597 9.523c-.253.325-.338.916-.338 2.252 0 2.098.275 2.67 1.266 2.67.78 0 3.777-1.64 4.072-2.232.359-.706-.085-1.24-1.836-2.213-1.814-1.01-2.658-1.144-3.164-.477z"
        fill={color}//"#000"
        stroke= {color} //"#000"
        strokeWidth={0.5}
      />
    </Svg>
  )
}

export default Video 