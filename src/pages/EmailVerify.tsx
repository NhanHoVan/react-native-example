import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { BACKGROUND_SOURCE, COLORS, LOGO_SOURCE, SCREEN_H, SCREEN_W, SIZES } from "../utils/constant";
import i18n from "../locales/i18n";
import { registerConfirm } from "../config/api/user";
import { useNavigation } from "@react-navigation/native";
import Message from "../components/common/Message";
import { authNavi, messageType } from "../types";
import { initMessage } from "../utils/common";
import Validate from "../components/common/Validate";
import { isEmpty } from "../utils/validate";
import TextButton from "../components/common/TextButton";

const EmailVerify: React.FC = () => {
  const navigation = useNavigation<authNavi>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationErr, setVerificationErr] = useState("");
  const [message, setMessage] = React.useState<messageType>(initMessage);

  const handleConfirm = async () => {
    if (!checkValidate()) {
      try {
        setIsLoading(true)
        const data = await registerConfirm({ code: verificationCode })
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
  };

  const checkValidate = () => {
    if (isEmpty(verificationCode)) {
      setVerificationErr(i18n.t("validate.codeRequire"))
       return true
    }
  }

  const handleResendCode = () => {
    //Features developed later
  };

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

          <Text style={styles.textInfor}>{i18n.t("text.inforAccuracy")}</Text>

          <TextInput
              style={[styles.textInput, styles.formOval]}
              placeholder={i18n.t("placeholder.verificationCode")}
              value={verificationCode}
              onBlur={() => {
                if (verificationCode.trim().length > 0) {
                  setVerificationErr("")
                }
              }}
              onChangeText={(verificationCode) => setVerificationCode(verificationCode.trim())}
            />
            <Validate
              error={verificationErr}
              style={styles.textError}
              name={"exclamation-circle"}
              size={SIZES.small}
              color={COLORS.red} />
          
          { isLoading && <ActivityIndicator style={styles.loading} size="large" color={COLORS.primary}/> }
          
          <TextButton
            style={[styles.btnConfirm, styles.button, styles.formOval]}
            styleText={styles.btnText}
            text={i18n.t("text.confirm")}
            handlePress={handleConfirm}
            disabled={isLoading}
          />

          {/* <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.btnText}>{i18n.t("text.reSendCode")}</Text>
          </TouchableOpacity> */}
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
  textInfor: {
    width: SCREEN_W*0.85,
    textAlign: "center"
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnConfirm: {
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

export default EmailVerify;
