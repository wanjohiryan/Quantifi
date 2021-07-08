import * as React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


interface MoreLessProps {
    truncatedText: string | true;
    fullText: string | string[];
}

function MoreLessText({ truncatedText, fullText }: MoreLessProps) {
    const [more, setMore] = React.useState(false);
    return (
        <Text style={{color:"grey", fontSize:18}} >
            {more ? `${truncatedText}...` : fullText}
            <TouchableOpacity onPress={() => setMore(!more)}>
                <Text style={{color:"white", fontSize:15}}>{more ? "less" : "more"}</Text>
            </TouchableOpacity>
        </Text>
    )
}

interface MoreInfoProps {
    linesToTruncate: number;
    text: string | string[];
}

function MoreInfo({ text, linesToTruncate }: MoreInfoProps) {
    const [clippedText, setClippedText] = React.useState<boolean | string>(false);
    return clippedText ? (
        <MoreLessText truncatedText={clippedText} fullText={text} />
    ) : (
        <Text
            numberOfLines={linesToTruncate}
            ellipsizeMode={"tail"}
            onTextLayout={(event) => {
                //get all lines
                const { lines } = event.nativeEvent;
                //get lines after it truncates
                let text = lines.splice(0, linesToTruncate)
                    .map((line) => line.text)
                    .join('')
                //substring with some random digit, this might need more work depending on the font-size 
                setClippedText(text.substr(0, text.length - 9))
            }}>
            {text}
        </Text>
    )
}
export default MoreInfo;