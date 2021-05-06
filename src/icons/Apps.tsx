import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps{
  color?: string;
};

function Apps({color}:IconProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 6.35 6.35"
    >
      <Path 
      stroke={color}
      fill={color}
      strokeWidth={0.0352777}
       d="M.952.416C.855.45.677.592.553.725.367.919.332 1.06.305 1.59c-.035.752.15 1.14.647 1.353.425.177 1.09.16 1.453-.035.806-.434.86-1.928.08-2.405C2.175.318 1.307.265.952.416zm1.303.68c.212.195.221.964.008 1.194-.194.212-.965.22-1.196.009C.855 2.113.846 1.29 1.05 1.087c.186-.194.983-.185 1.205.01z" />
      <Path 
      stroke={color}
      fill={color}
      strokeWidth={0.0352777}
      d="M3.938.504c-.78.477-.727 1.971.08 2.405.363.194 1.028.212 1.453.035.496-.212.682-.601.647-1.362C6.09 1 6.065.92 5.798.663c-.256-.265-.336-.292-.92-.318-.532-.018-.7.009-.94.159zm1.435.583c.195.186.186.982-.008 1.203-.195.212-.966.22-1.197.009-.212-.195-.221-.964-.008-1.194.186-.212 1.01-.22 1.213-.018zM.934 3.554c-.478.203-.664.601-.629 1.353.027.583.053.663.32.919.256.265.336.292.92.318.532.018.7-.009.94-.159.78-.477.726-1.971-.08-2.405-.354-.194-1.063-.203-1.47-.026zm1.32.636c.213.195.222.964.01 1.194-.187.212-1.01.221-1.214.018-.195-.186-.187-.982.008-1.203.195-.212.966-.22 1.197-.009zM3.69 3.987a.636.636 0 00-.018.292c.027.141.133.159 1.081.159.886 0 1.063-.027 1.143-.15.071-.106.062-.186-.018-.283-.168-.195-2.117-.212-2.188-.018zM3.717 5.34c-.116.106-.062.45.08.504.079.026.53.053 1.01.053.673 0 .903-.036 1.01-.142.168-.168.177-.23.035-.371-.115-.115-2.03-.16-2.135-.044z" />
    </Svg>
  )
}

export default Apps
//stroke-width:0.0352777