import * as React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";

import { Channel } from "./Model";
import styles,{width} from "./Styles";

interface ThumbnailProps {
  channel: Channel;
}

const Thumbnail = ({
  channel: { cover, type, title, subtitle }
}: ThumbnailProps) => {
  return (
    <View style={{width:width}}>
      <View style={styles.thumbContainer}>
        <Image source={cover} style={styles.cover} />
      </View>
      <View style={styles.content}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};
export default Thumbnail;
