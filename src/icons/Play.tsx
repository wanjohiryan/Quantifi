import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 18 18"
      //fill="white"
      {...props}
    >
      <Path
        d="M2.098.38c-.558.167-1.08.553-1.371.998l-.256.415v14.236l.279.415c.627.94 2.126 1.354 3.207.89.674-.287 12.712-6.663 13.002-6.88.686-.535.964-1.583.604-2.314-.267-.554-.813-.91-3.823-2.511-1.615-.85-4.427-2.343-6.262-3.312C5.642 1.348 3.957.488 3.736.409 3.271.24 2.61.23 2.098.379z"
        strokeWidth={9.33}
      />
    </Svg>
  )
}

export default SvgComponent