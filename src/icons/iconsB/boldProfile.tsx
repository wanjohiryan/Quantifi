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
        d="M12 15.174c4.339 0 8 .705 8 3.425C20 21.32 16.315 22 12 22c-4.338 0-8-.705-8-3.425 0-2.721 3.685-3.401 8-3.401zM12 2a5.273 5.273 0 015.294 5.291A5.274 5.274 0 0112 12.583a5.275 5.275 0 01-5.294-5.292A5.274 5.274 0 0112 2z"
        fill="#000"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default SvgComponent