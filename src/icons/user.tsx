import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

interface IconProps{
    color?:string;
}

function User ({color}:IconProps) {
  return (
    <Svg 
    height={20}
    width={20}
    viewBox="0 0 10 20">
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Path
            data-name="user"
            d="M11 19H3a2 2 0 01-2-2h0a2 2 0 012-2h8a2 2 0 012 2h0a2 2 0 01-2 2zM7 1a5 5 0 105 5 5 5 0 00-5-5z"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </G>
      </G>
    </Svg>
  )
}

export default User 
