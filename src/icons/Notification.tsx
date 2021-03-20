import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

interface IconProps{
    props:any;
}

function Notification ({props}:IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-notification"
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
      <Path d="M10 6H7a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3" />
      <Circle cx={17} cy={7} r={3} />
    </Svg>
  )
}

export default Notification 