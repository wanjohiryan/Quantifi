import * as React from "react"
import Svg, { SvgProps, Rect, Path, Ellipse } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 18 18"
      {...props}
    >
      <Rect
        width={4.331}
        height={9.537}
        x={7.236}
        y={1.713}
        rx={2.285}
        fill="none"
        stroke="#000"
        strokeWidth={1.6}
        strokeLinecap="square"
        strokeLinejoin="round"
        //paintOrder="fill markers stroke"
      />
      <Path
        d="M4.5 7.5c.073 1.786.147 3.57 1.003 4.713.856 1.142 2.494 1.642 4.035 1.61 1.54-.033 2.984-.598 3.753-1.74.77-1.142.864-2.862.959-4.583"
        fill="none"
        stroke="#000"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        //paintOrder="fill markers stroke"
      />
      <Ellipse
        cx={9.491}
        cy={16.412}
        rx={1.267}
        ry={0.464}
        fill="none"
        stroke="#000"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        //paintOrder="fill markers stroke"
      />
    </Svg>
  )
}

export default SvgComponent