import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

interface IconProps{
    color:string;
}

function Picture ({color}:IconProps){
  return (
    <Svg width={35} height={35} viewBox="0 0 35 35" stroke={color}>
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Path fill={color} d="M48.5 59h-38A10.51 10.51 0 010 48.5v-38A10.51 10.51 0 0110.5 0h38A10.51 10.51 0 0159 10.5v38A10.51 10.51 0 0148.5 59zm-38-54A5.51 5.51 0 005 10.5v38a5.51 5.51 0 005.5 5.5h38a5.51 5.51 0 005.5-5.5v-38A5.51 5.51 0 0048.5 5z" />
          <Path fill={color}  d="M2.5 49.52a2.5 2.5 0 01-1.77-4.26L17.4 28.59a2.5 2.5 0 013.54 0l6.5 6.49 12.87-12.87a2.5 2.5 0 013.54 0l14.42 14.42a2.5 2.5 0 01-3.54 3.53L42.08 27.51 29.2 40.39a2.5 2.5 0 01-3.53 0l-6.5-6.5-14.9 14.9a2.49 2.49 0 01-1.77.73z" />
          <Circle fill={color} cx={22.789} cy={19.493} r={6} />
        </G>
      </G>
    </Svg>
  )
}

export default Picture