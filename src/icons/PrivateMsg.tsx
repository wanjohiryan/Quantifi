import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 18 18"
      {...props}
    >
      <G strokeWidth={7.068}>
        <Path d="M2.555.59C1.905.79 1.24 1.383.915 2.05c-.297.623-.311.736-.269 7.52L.69 16.45l.466.453c.396.397.552.467 1.16.467.678 0 .72-.028 1.795-1.09l1.103-1.09 5.244-.043 5.231-.042.58-.383c.31-.212.72-.623.904-.92l.34-.538V2.346l-.382-.58c-.212-.312-.622-.723-.919-.907l-.537-.34L9.312.491C5.82.477 2.767.52 2.555.591zm12.977 1.912l.354.34V12.783l-.354.34-.339.354H4.506l-1.089 1.09-1.103 1.105V2.842l.354-.34.34-.354H15.192z" />
        <Path d="M10.076 5.306c-.396.198-.778.566-1.047.977l-.424.666H6.867c-2.474.014-2.856.283-2.856 1.996v.85h1.696V8.662H8.605l.326.567c.17.311.58.75.904.963.495.325.735.382 1.527.382.778 0 1.032-.057 1.513-.382.89-.58 1.244-1.275 1.244-2.408 0-.821-.057-1.02-.424-1.543-.849-1.204-2.361-1.586-3.62-.935zm2.064 1.728c.226.212.353.51.353.779s-.127.566-.353.778a1.101 1.101 0 01-.778.354c-.269 0-.565-.127-.777-.354a1.105 1.105 0 01-.354-.778c0-.27.127-.567.354-.78.212-.226.508-.353.777-.353s.566.127.778.354z" />
      </G>
    </Svg>
  )
}

export default SvgComponent