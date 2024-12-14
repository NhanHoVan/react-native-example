import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../utils/constant";
import Icon from 'react-native-vector-icons/FontAwesome';

const Validate: React.FC<any> = (props) => {
  const {error, style, name, size, color} = props

  return (
    error.length > 0 &&
    <View style={[styles.blockError, style]}>
        {name && <Icon name={name} size={size} color={color}/>}
        <Text style={styles.textError}>{error}</Text>
    </View>
  );
};

export default Validate;

const styles = StyleSheet.create({
  blockError: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textError: {
    marginLeft: 5,
    color: COLORS.red,
    fontSize: SIZES.small
  }
});