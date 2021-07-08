import * as React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import { SvgProps } from "react-native-svg";
import {default as HomeIcon} from "./brokenHome";
import {default as AppIcon} from "./brokenCategory";
import {default as ArrowLeft} from "./arrowLeft"
import {default as ArrowRight} from "./arrowRightCircle";
import {default as Camera} from "./brokenCamera";
import {default as Voice} from "./brokenVoice";
import {default as PauseBtn} from "./pauseBtn";
import {default as PlayBtn} from "./playBtn";
import {default as Ticket} from "./brokenTicketStar";
import {default as ShareIcon} from "./brokenUpload";
import {default as LikeIcon} from "./brokenHeart";
import {default as CommentIcon} from "./brokenChat";

const icons = {
    home:<HomeIcon/>,
    apps:<AppIcon/>,
    arrowLeft: <ArrowLeft/>,
    arrowRight:<ArrowRight/>,
    camera:<Camera/>,
    voice:<Voice/>,
    pause:<PauseBtn/>,
    play:<PlayBtn/>,
    ticketStar:<Ticket/>,
    share:<ShareIcon/>,
    like:<LikeIcon/>,
    comment:<CommentIcon/>
}

type nameIcon = "apps" | "home" | "arrowLeft" 
                | "arrowRight" | "camera" | "voice" 
                | "pause" | "play" | "ticketStar" 
                | "share" | "like" | "comment";

interface IconProps{
    name:nameIcon;
    svg:SvgProps;
    style?:StyleProp<ViewStyle>;
}

export default function Icon ({name, svg, style}:IconProps){
    return(
        <View style={[{
            justifyContent:"center", 
            alignContent:"center"}, style]}>
            {React.cloneElement(icons[name],svg)}
        </View>
    )
}