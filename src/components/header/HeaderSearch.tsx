import { View, TextInput, StyleSheet } from "react-native";
import { COLORS, SIZES, SCREEN_W } from "../../utils/constant";
import IconButton from "../common/IconButton";
import i18n from "../../locales/i18n";

const HeaderSearch: React.FC<any> = (props) => {
  const { searchTerm, onChangeText } = props;
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder={i18n.t("placeholder.search")}
          value={searchTerm}
          onChangeText={(text) => onChangeText(text)}
        />
      </View>
      <IconButton
        style={styles.searchButton}
        name={"search"}
        size={SIZES.medium}
        color={COLORS.gray}
      />
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 40,
  },
  searchWrapper: {
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: "100%",
    width: SCREEN_W - 140,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    color: COLORS.gray,
    paddingHorizontal: SIZES.medium,
  },
  searchButton: {
    position: "absolute",
    right: 15,
  },
});
