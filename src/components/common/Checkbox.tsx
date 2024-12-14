import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Checkbox: React.FC<any> = (props) => {
  const {isChecked, onOpenLink, onChecked, text, textLink, styleBox, styleText, styleTextLink, size, color} = props

  return (
    <View style={[styles.blockCheckbox, styleBox]}>
      <TouchableOpacity onPress={onChecked} >
        <Icon name={isChecked ? 'check-square-o' : 'square-o'} size={size} color={color}/>
      </TouchableOpacity>
      <Text style={styleText}>{text}</Text>
      {textLink && <TouchableOpacity onPress={onOpenLink} >
        <Text style={styleTextLink}>{textLink}</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  blockCheckbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});