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
        d="M12 2c5.514 0 10 4.485 10 10 0 5.514-4.486 10-10 10a9.939 9.939 0 01-7.927-3.902.727.727 0 011.152-.888A8.492 8.492 0 0012 20.546c4.712 0 8.545-3.833 8.545-8.546 0-4.712-3.833-8.546-8.545-8.546S3.454 7.288 3.454 12c0 .438.033.873.098 1.299a.728.728 0 01-1.438.22A10.1 10.1 0 012 11.999C2 6.486 6.486 2 12 2zm-4.48 8.804c.661 0 1.198.537 1.198 1.196a1.199 1.199 0 01-2.396 0c0-.66.538-1.196 1.198-1.196zm4.48 0c.66 0 1.198.537 1.198 1.196a1.2 1.2 0 01-2.396 0c0-.66.537-1.196 1.198-1.196zm4.479 0c.66 0 1.198.537 1.198 1.196a1.199 1.199 0 01-2.396 0c0-.66.538-1.196 1.198-1.196z"
        fill="#000"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default SvgComponent