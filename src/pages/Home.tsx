import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  BACKGROUND_SOURCE,
  COLORS,
  LOGO_SOURCE,
  SIZES,
} from "../utils/constant";
import i18n from "../locales/i18n";
import Icon from "react-native-vector-icons/FontAwesome";
import PopupInfor from "../components/pages/signUp/PopupInfor";
import { dumyTerms } from "../../data/terms";
import { authNavi } from "../types";
import TextButton from "../components/common/TextButton";

const Home: React.FC = () => {
  const navigation = useNavigation<authNavi>();
  const [showPopupInfor, setShowPopupInfor] = useState(false)

  const [fontsLoaded] = useFonts({
    "Allura-Regular": require("../../assets/fonts/Allura-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleToLogin = () => {
    navigation.navigate("Login", { name: "Login" });
  };

  const handleSkipLogin = () => {
    setShowPopupInfor(!showPopupInfor)
    navigation.navigate("ListTopic", { name: "ListTopic" });
  };

  return (
    <ImageBackground source={BACKGROUND_SOURCE} resizeMode="cover">
      <View style={styles.screenView}>
        <Image style={styles.image} source={LOGO_SOURCE} />
        <Text style={styles.titleProject}>{i18n.t("title.project")}</Text>

        <TextButton
          style={[styles.btnLogin, styles.button]}
          styleText={styles.textBtn}
          text={i18n.t("text.login")}
          handlePress={handleToLogin}
        />

        <PopupInfor
          show={showPopupInfor}
          closePopup={()=>setShowPopupInfor(!showPopupInfor)}
          textHeader={i18n.t("text.terms")}
          textContent={dumyTerms}
          textConfirm={i18n.t("text.confirm")}
          handleConfirm={handleSkipLogin}
        />

        <View style={styles.bottomScreen}>
          <TouchableOpacity style={[styles.btnSkip, styles.button]} onPress={()=>setShowPopupInfor(!showPopupInfor)}>
            <Text style={styles.skipText}>{i18n.t("text.skip")}</Text>
            <Icon name={"angle-double-right"} size={17} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Home;

const styles = StyleSheet.create({
  screenView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250
  },
  titleProject: {
    fontFamily: "Allura-Regular",
    fontSize: 60,
  },
  button: {
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
  }, 
  btnLogin: {
    backgroundColor: COLORS.primary,
    marginBottom: 50
  },
  textBtn: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  bottomScreen: {
    position: "absolute",
    bottom: 20
  },
  btnSkip: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white
  },
  skipText: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    marginRight: 10
  },
});
