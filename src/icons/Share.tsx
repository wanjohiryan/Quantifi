import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Circle cx={6} cy={12} r={3} fill="transparent" />
      <Circle cx={18} cy={6} r={3} fill="transparent" />
      <Circle cx={18} cy={18} r={3} fill="transparent" />
      <Path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4" />
    </Svg>
  )
}

export default SvgComponent