import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 18 18"
      {...props}
    >
      <Path
        d="M11.584 3.019c-1.683 1.787-6.636 6.25-6.636 6.25l6.894 6.134"
        fill="none"
        stroke="#000"
        strokeWidth={4.649}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.92}
      />
    </Svg>
  )
}

export default SvgComponent