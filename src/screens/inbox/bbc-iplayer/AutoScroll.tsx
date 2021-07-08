import * as React from "react";
import {
    Animated,
    Easing,
    ScrollView,
    View,
    ViewStyle,
    LayoutChangeEvent,
    StyleProp
} from "react-native";

interface Props{
    children:React.ReactElement<any>;
    style:StyleProp<ViewStyle>;
    endPaddingWidth?:number;
    duration?:number;
    delay?:number;
    isLTR?:boolean;
}

const AutoScroll = ({
    style,
    children,
    endPaddingWidth,
    delay,
    isLTR,
    duration
}:Props)=>{
    const containerWidth = React.useRef(0);
    const contentWidth = React.useRef(0);
    const [isScrolling, setScrolling] = React.useState(false);
    const [dividerWidth, setDividerWidth] = React.useState(endPaddingWidth);
    const offsetX = React.useRef(new Animated.Value(0));
    let contentRef: any;

    function checkContent(newContentWidth:number, fx:number){
        if (!contentWidth){
            setScrolling(false);
            return;
        }

        if (contentWidth.current === newContentWidth)return;
            contentWidth.current = newContentWidth;
        let newDividerWidth = endPaddingWidth;
        if (contentWidth.current < containerWidth.current){
            //@ts-expect-error
            if(endPaddingWidth < containerWidth.current - contentWidth.current){
                newDividerWidth = containerWidth.current - contentWidth.current;
            }
        }
        setDividerWidth(newDividerWidth);

        if(isLTR){
            //@ts-expect-error
            offsetX.current.setValue(-(newContentWidth + newDividerWidth));
        }
        Animated.loop(
            Animated.timing(offsetX.current, {
                //@ts-expect-error
                toValue:isLTR? fx : -(contentWidth.current + fx + newDividerWidth),
                duration: duration || 50 * contentWidth.current,
                delay,
                easing:Easing.linear,
                useNativeDriver:true,
            })
        ).start()
    }

    function measureContainerView(event:LayoutChangeEvent){
        const newContainerWidth = event.nativeEvent.layout.width;
        if (containerWidth.current === newContainerWidth) return;
        containerWidth.current = newContainerWidth;
        if (!contentRef) return;
        contentRef.measure((fx:number, _fy:number, width:number)=>{
            checkContent(width, fx);
        })
    }

    function measureContentView(event:LayoutChangeEvent){
        const {width, x} = event.nativeEvent.layout;
        if (!containerWidth.current || width === contentWidth.current)return;
        offsetX.current.stopAnimation();
        offsetX.current.setValue(0);
        offsetX.current.setOffset(0);
        checkContent(width, x);
    }

    const childrenProps = children.props;
    const childrenWithProps = React.cloneElement(children,{
        ...childrenProps,
        onLayout:measureContentView,
        ref:(ref:any) => (contentRef = ref),
    });
    return(
        <View 
        onLayout={measureContainerView}
        style={style}
        >
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEnabled={false}
            >
                {isLTR ? (
                    <Animated.View
                    style={{
                        flexDirection:"row",
                        transform:[{translateX:offsetX.current}],
                    }}>
                        {isScrolling && children}
                        {isScrolling && <View style={{width:dividerWidth}}/>}
                        {childrenWithProps}
                    </Animated.View>
                ):(
                    <Animated.View
                    style={{
                        flexDirection:"row",
                        transform:[{translateX:offsetX.current}],
                    }}>
                        {childrenWithProps}
                        {isScrolling && <View style={{width:dividerWidth}}/>}
                        {isScrolling && children}
                    </Animated.View>
                )}
            </ScrollView>
        </View>
    );
};

export default AutoScroll;