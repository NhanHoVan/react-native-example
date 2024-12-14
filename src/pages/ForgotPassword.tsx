import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { BACKGROUND_SOURCE, COLORS, LOGO_SOURCE, SCREEN_H, SCREEN_W, SIZES } from "../utils/constant";
import i18n from "../locales/i18n";
import { useNavigation } from "@react-navigation/native";
import { lostPassword } from "../config/api/user";
import Validate from "../components/common/Validate";
import { authNavi, messageType } from "../types";
import { initMessage } from "../utils/common";
import { isEmail, isEmpty } from "../utils/validate";
import Message from "../components/common/Message";
import TextButton from "../components/common/TextButton";

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<authNavi>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [message, setMessage] = React.useState<messageType>(initMessage);

  const handleRetrievePassword = async () => {
    if (!checkValidate()) {
      try {
        setIsLoading(true)
        let data = await lostPassword({ email: email })
        let dataRes = JSON.parse(JSON.stringify(data))
        if (dataRes) {
          navigation.navigate("Login", { name: "Login" });
        }
      } catch (error: any) {
        setMessage({
          message: `${error}`,
          type: 'error'
        })
      }
      setIsLoading(false)
    }
  }

  const checkValidate = () => {
    if (isEmpty(email)) {
      setEmailErr(i18n.t("validate.emailRequire"))
       return true
    }
    if (!isEmail(email)) {
      setEmailErr(i18n.t("validate.emailPattern"))
      return true
    }
    return false
  }

  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled={Platform.OS === "ios" ? true : false}
        >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <ImageBackground source={BACKGROUND_SOURCE} resizeMode="cover" >
        <View style={styles.screenView}>
          <Image style={styles.image} source={LOGO_SOURCE} />
          <Text style={styles.title}>{i18n.t("title.project")}</Text>
          <TextInput
              style={[styles.textInput, styles.formOval]}
              placeholder={i18n.t("placeholder.yourEmail")}
              value={email}
              onBlur={() => {
                if (email.trim().length > 0) {
                  setEmailErr("")
                }
              }}
              onChangeText={(email) => setEmail(email.trim())}
            />
            <Validate
              error={emailErr}
              style={styles.textError}
              name={"exclamation-circle"}
              size={SIZES.small}
              color={COLORS.red} />

            { isLoading && <ActivityIndicator style={styles.loading} size="large" color={COLORS.primary}/> }

            <TextButton
              style={[styles.btnRetrieval, styles.button, styles.formOval]}
              styleText={styles.btnText}
              text={i18n.t("text.passwordRetrieval")}
              handlePress={handleRetrievePassword}
              disabled={isLoading}
            />
        </View>
        <SafeAreaView>
          { message.message.length > 0 ?
            <Message
              visible={message.message.length > 0}
              type={message?.type}
              message={message?.message}
              closeMessage={()=>setMessage(initMessage)}
            />
          : null }
        </SafeAreaView>
      </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ForgotPassword;

const styles = StyleSheet.create({
  screenView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150
  },
  title: {
    fontFamily: "Allura-Regular",
    fontSize: 50,
  },
  formOval: {
    height: 50,
    width: 260,
    borderRadius: 25,
  },
  textError: {
    width: 260,
    left: 10
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    marginTop: 10,
    padding: 15,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnRetrieval: {
    backgroundColor: COLORS.primary,
    marginBottom: 10
  },
  btnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  loading: {
    position: "absolute",
    top: SCREEN_H/2,
    left: (SCREEN_W-40)/2
  }
});
