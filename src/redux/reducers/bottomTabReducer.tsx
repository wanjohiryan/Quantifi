import Animated, {useSharedValue} from "react-native-reanimated";


const value = (state = useSharedValue(0), actions:any)=>{
    switch(actions.type){
        case 'TOGGLE_TAB':
                return {useSharedValue(y)};
        default:
            return state
    }
};

export default value;