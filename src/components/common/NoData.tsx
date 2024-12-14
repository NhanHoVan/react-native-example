import { Image, StyleSheet, View, Text } from "react-native";
import { COLORS, NODATA_SOURCE, SIZES } from "../../utils/constant";

const NoData: React.FC<any> = (props) => {
  const { text } = props
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={NODATA_SOURCE} />
      <Text style={styles.mainText}>No Data</Text>
      { text && <Text style={styles.subText}>{ text }</Text> }
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 130,
  },
  mainText: {
    marginTop: 10,
    color: COLORS.gray,
    fontWeight: 'bold',
    fontSize: SIZES.large
  },
  subText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  }
});