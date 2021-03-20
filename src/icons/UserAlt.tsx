import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps{
    props:any;
}
function User2 ({props}:IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-user"
      width={35}
      height={35}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path
        d="M12 20.84c-3.013 0-5.656-1.327-5.656-2.84S8.987 15.16 12 15.16s5.656 1.327 5.656 2.84-2.643 2.84-5.656 2.84M12 14c-3.866 0-7 1.79-7 4s3.134 4 7 4 7-1.79 7-4-3.134-4-7-4M12 4.622A3.382 3.382 0 0115.378 8 3.382 3.382 0 0112 11.378 3.382 3.382 0 018.622 8 3.382 3.382 0 0112 4.622M12 13c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5"
        fill="#000"
        stroke="none"
      />
    </Svg>
  )
}

export default User2 