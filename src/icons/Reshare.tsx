import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg fill="white" width={24} height={24} {...props}>
      <Path
        d="M8 16h12V8M8 16l2 2M17 7H5v8M17 7l-2-2"
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent