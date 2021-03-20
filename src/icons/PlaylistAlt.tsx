import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps{
    props:any;
}

function PlaylistAlt ({props}:IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={266.667}
      height={266.667}
      viewBox="0 0 200 200"
      {...props}
    >
      <Path d="M125.9 15.7l-16.6 4.6 1.7 6.6c6 23.2 43.3 161.7 43.6 162 .2.2 8.4-1.8 18.2-4.4l18-4.8-2.8-10.1c-1.5-5.6-11.6-43.5-22.6-84.4C150 27.5 145.2 11 144 11.1c-.8 0-9 2.1-18.1 4.6zm30 82.4c10.6 39.7 18.9 72.4 18.4 72.9-.9.8-10.4 3.3-10.8 2.8-.4-.4-38.5-142.5-38.5-143.6 0-.7 7.9-3.7 11.1-4.1.3-.1 9.2 32.3 19.8 72zM12.5 13.2c-.3.7-.4 40.2-.3 87.8l.3 86.5 18.8.3 18.7.2V12H31.5c-13.9 0-18.7.3-19 1.2zM37 100v75H25V25h12v75zM62.5 13.2c-.3.7-.4 40.2-.3 87.8l.3 86.5 18.8.3 18.7.2V12H81.5c-13.9 0-18.7.3-19 1.2zM87 100v75H75V25h12v75z" />
    </Svg>
  )
}

export default PlaylistAlt 