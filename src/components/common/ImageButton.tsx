import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { SIZES } from "../../utils/constant";

const ImageButton: React.FC<any> = (props) => {
  const {source, handlePress, style, styleImg, disabled} = props
  return (
    <TouchableOpacity style={style ? style : styles.btnContainer} onPress={handlePress} disabled={disabled}>
      <Image style={styleImg ? styleImg : styles.image} source={source} />
    </TouchableOpacity>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 20
  }
});