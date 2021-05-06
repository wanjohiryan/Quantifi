import * as React from "react";
import { View, StyleSheet, Text} from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    position:"absolute",
    top:0,
    borderRadius:15,
  }
});

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:"white",fontWeight:"bold"}}>MENU</Text>
      <Text style={{color:"white",fontWeight:"bold"}}>SEARCH</Text>
    </View>
  );
};

export default Header;
