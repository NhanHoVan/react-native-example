import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from "react-native";
import { BACKGROUND_SOURCE, COLORS, LOGO_SOURCE, SCREEN_H, SCREEN_W, SIZES } from "../utils/constant";
import i18n from "../locales/i18n";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../config/api/user";
import Message from "../components/common/Message";
import { authNavi, messageType } from "../types";
import { initMessage } from "../utils/common";
import Validate from "../components/common/Validate";
import Checkbox from "../components/common/Checkbox";
import { isEmail, isEmpty, isEqual } from "../utils/validate";
import PopupInfor from "../components/pages/signUp/PopupInfor";
import { dumyTerms } from "../../data/terms";
import TextButton from "../components/common/TextButton";

const SignUp: React.FC = () => {
  const navigation = useNavigation<authNavi>();

  const [isLoading, setIsLoading] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordErr, setRePasswordErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = React.useState<messageType>(initMessage);

  const handleSignUp = async () => {
    if (!checkValidate()) {
      try {
        setIsLoading(true)
        let data = await registerUser({
          username: userName,
          password: password,
          email: email,
          agreeTerms: agreeTerms
        })
        let resData = JSON.parse(JSON.stringify(data))
        if(resData) {
          navigation.navigate("EmailVerify", { name: "EmailVerify" });
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
    let valid = false
    if (isEmpty(userName)) {
      setUserNameErr(i18n.t("validate.userNameRequire"))
      valid = true
    }
    if (isEmpty(password)) {
      setPasswordErr(i18n.t("validate.passwordRequire"))
      valid = true
    }
    if (isEmpty(rePassword)) {
      setRePasswordErr(i18n.t("validate.passwordRequire"))
      valid = true
    } else if (!isEqual(password, rePassword)) {
      setRePasswordErr(i18n.t("validate.rePasswordEqual"))
      valid = true
    }
    if (isEmpty(email)) {
      setEmailErr(i18n.t("validate.emailRequire"))
      valid = true
    } else if (!isEmail(email)) {
      setEmailErr(i18n.t("validate.emailPattern"))
      valid = true
    }
    return valid
  }

  const handleToLogin = () => {
    navigation.navigate("Login", { name: "Login" });
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

            <TextInput
                style={[styles.textInput, styles.formOval]}
                placeholder={i18n.t("placeholder.yourAccount")}
                value={userName}
                onBlur={() => {
                  if (userName.trim().length > 0) {
                    setUserNameErr("")
                  }
                }}
                onChangeText={(userName) => setUserName(userName.trim())}
              />
              <Validate
                error={userNameErr}
                style={styles.textError}
                name={"exclamation-circle"}
                size={SIZES.small}
                color={COLORS.red} />

            <TextInput
                style={[styles.textInput, styles.formOval]}
                placeholder={i18n.t("placeholder.password")}
                secureTextEntry={true}
                value={password}
                onBlur={() => {
                  if (password.trim().length > 0) {
                    setPasswordErr("")
                  }
                }}
                onChangeText={(password) => setPassword(password.trim())}
              />
              <Validate
                error={passwordErr}
                style={styles.textError}
                name={"exclamation-circle"}
                size={SIZES.small}
                color={COLORS.red} />

            <TextInput
                style={[styles.textInput, styles.formOval]}
                placeholder={i18n.t("placeholder.rePassword")}
                secureTextEntry={true}
                value={rePassword}
                onBlur={() => {
                  if (rePassword.trim().length > 0) {
                    setRePasswordErr("")
                  }
                }}
                onChangeText={(rePassword) => setRePassword(rePassword.trim())}
              />
              <Validate
                error={rePasswordErr}
                style={styles.textError}
                name={"exclamation-circle"}
                size={SIZES.small}
                color={COLORS.red} />

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

            <PopupInfor
              show={showPopup}
              closePopup={()=>setShowPopup(!showPopup)}
              textHeader={i18n.t("text.terms")}
              textContent={dumyTerms}
            />
            <Checkbox
              textLink={i18n.t("text.terms")}
              onOpenLink={()=>setShowPopup(!showPopup)}
              styleTextLink={styles.textLink}
              isChecked={agreeTerms}
              onChecked={()=>setAgreeTerms(!agreeTerms)}
              text={i18n.t("text.accept")}
              styleText={styles.textTerms}
              styleBox={styles.boxTerms}
              size={SIZES.medium}
              color={COLORS.primary}
            />

            { isLoading && <ActivityIndicator style={styles.loading} size="large" color={COLORS.primary}/>}
            
            <TextButton
              style={[styles.btnSignUp, styles.button, styles.formOval]}
              styleText={styles.btnText}
              text={i18n.t("text.register")}
              handlePress={handleSignUp}
              disabled={!agreeTerms || isLoading}
            />

            <TextButton
              style={[styles.btnLogin, styles.button, styles.formOval]}
              styleText={styles.btnText}
              text={i18n.t("text.login")}
              handlePress={handleToLogin}
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
  textTerms: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    marginLeft: 5
  },
  textLink: {
    color: COLORS.darkorange,
    fontSize: SIZES.small,
    marginLeft: 3
  },
  boxTerms: {
    width: 260,
    left: 10,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSignUp: {
    backgroundColor: COLORS.primary,
    marginBottom: 10
  },
  btnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  btnLogin: {
    backgroundColor: COLORS.gray2,
    marginTop: 30
  },
  loading: {
    position: "absolute",
    top: SCREEN_H/2,
    left: (SCREEN_W-40)/2
  }
});

export default SignUp;
