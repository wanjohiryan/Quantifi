import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        d="M15.526 2H8.629C5.784 2 4 3.986 4 7.172v13.151C4 21.249 4.733 22 5.638 22c.274 0 .543-.07.784-.203l5.612-3.116 6.535 3.134a.709.709 0 00.554.002.733.733 0 00.394-.4.759.759 0 00-.319-.882l-6.491-3.107a1.385 1.385 0 00-1.362 0l-5.62 3.107a.211.211 0 01-.208 0 .213.213 0 01-.095-.185V7.172c.009-2.356 1.164-3.698 3.233-3.698h6.897c2.655 0 3.043 2.206 3.043 3.53v.6h-7.466a.708.708 0 00-.498.234.743.743 0 00-.191.526c.009.386.312.696.69.706h7.439v7.723c0 .404.32.732.715.732.392 0 .711-.322.716-.724V7.004C20 3.915 18.293 2 15.526 2z"
        fill="#000"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default SvgComponent