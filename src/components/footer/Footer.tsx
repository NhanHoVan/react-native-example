import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const Footer: React.FC = () => {

  return (
    <View style={styles.footer}>
      <View style={styles.iconControl}>
        <View style={styles.btnControl}>
          <TouchableOpacity style={styles.styleBtn}>
            <FontAwesomeIcon name="home" size={24} color="#d73600" />
          </TouchableOpacity>
        </View>
        <View style={styles.btnControl}>
          <TouchableOpacity style={styles.styleBtn}>
            <FontAwesomeIcon name="heart" size={24} color="#d73600" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Footer;

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 2,      
    borderTopColor: '#d73600',    
    borderTopStyle: 'solid',
    height: 85,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", 
    alignItems: "center", 
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  btnControl: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    height: 80
  },
  styleBtn: {
    backgroundColor: '#fffae3',
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 5
  }
})
