import * as React from "react"
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G transform="translate(2 2)" fill="#000" fillRule="nonzero">
        <Path d="M18.56 6.79a.733.733 0 01.724.732v6.473c0 3.703-2.315 6.005-6.027 6.005h-2.952a.742.742 0 01-.743-.732.75.75 0 01.743-.74h2.952c2.925 0 4.542-1.606 4.569-4.533V7.522c0-.404.328-.732.733-.732zM12.522.776a.742.742 0 01.734.74.731.731 0 01-.743.733H6.02c-2.926 0-4.543 1.613-4.543 4.541v7.205c0 2.927 1.617 4.532 4.543 4.532a.75.75 0 01.742.741.742.742 0 01-.742.732C2.307 20 0 17.698 0 13.995V6.79C0 3.078 2.307.776 6.019.776zm1.118 6.698a.735.735 0 01.86.025.73.73 0 01.196.931l-2.828 3.642a.787.787 0 01-.495.283.744.744 0 01-.539-.16l-2.713-2.124-2.44 3.165a.734.734 0 01-1.033.15.74.74 0 01-.133-1.031l2.89-3.757a.743.743 0 011.043-.132l2.713 2.125 2.386-3.042z" />
        <Circle
          cx={16.957}
          cy={3.047}
          r={1.85}
          fill="none"
          stroke="#000"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent