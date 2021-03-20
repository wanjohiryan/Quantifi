import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps{
  props:any;
}

function Playlist ({props}:IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-folders"
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
      <Path d="M9 4h3l2 2h5a2 2 0 012 2v7a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2" />
      <Path d="M17 17v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2h2" />
    </Svg>
  )
}

export default Playlist