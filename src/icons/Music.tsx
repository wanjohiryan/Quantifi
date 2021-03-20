import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface MusicProps {
    color?: string;
};
 const d = "M8899 7595c-294-94-320-503-40-634 47-22 70-26 141-26 77 0 92 3 154 34l68 33 33-32c61-59 104-16 45 45l-32 33 33 68c31 62 34 77 34 154 0 102-28 173-95 240-84 84-230 121-341 85zm196-72c31-10 67-34 95-63 170-169 50-460-190-460-73 0-138 28-190 80-107 106-107 274 0 381 75 75 181 98 285 62z";
 
 export default function Music({ color }: MusicProps) {
    return (
        <Svg width={35} height={35} 
        viewBox = "0 0 35 35"
        fill='none'
        stroke={color} >
            <Path d={d} />
        </Svg>
    )
};
