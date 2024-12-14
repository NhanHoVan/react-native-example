import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../../utils/constant";

const TextButton: React.FC<any> = (props) => {
  const {text, handlePress, style, styleText, disabled} = props
  return (
    <TouchableOpacity style={style ? style : styles.btnContainer} onPress={handlePress} disabled={disabled}>
      <Text style={styleText ? styleText : styles.text}>{ text }</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  }
});