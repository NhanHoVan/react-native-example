import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../utils/constant";

const HeaderText: React.FC<any> = (props) => {
    const { storyName, categoryName } = props
    return (
        <View>
          <Text style={styles.titleCategories} numberOfLines={1}>{ categoryName }</Text>
          <Text style={styles.titleStories} numberOfLines={1}>{ storyName }</Text>
        </View>
    )
};

export default HeaderText;

const styles = StyleSheet.create({
    titleCategories: {
        textAlign: "center",
        color: COLORS.primary,
        fontSize: SIZES.small,
        fontWeight: "700",
    },
    titleStories: {
        textAlign: "center",
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: "400"
    },
});
