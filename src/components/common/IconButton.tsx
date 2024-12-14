import { TouchableOpacity, StyleSheet } from "react-native";
import { SIZES } from "../../utils/constant";
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton: React.FC<any> = (props) => {
  const {name, size, color, handlePress, style, disabled} = props
  return (
    <TouchableOpacity style={style ? style : styles.btnContainer} onPress={handlePress} disabled={disabled}>
        <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  }
});