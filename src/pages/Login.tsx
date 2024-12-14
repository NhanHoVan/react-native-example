import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { BACKGROUND_SOURCE, COLORS, LOGO_SOURCE, SCREEN_H, SCREEN_W, SIZES } from "../utils/constant";
import i18n from "../locales/i18n";
import { useNavigation } from "@react-navigation/native";
import { login } from "../config/api/user";
import { authNavi, messageType } from "../types";
import { initMessage } from "../utils/common";
import Message from "../components/common/Message";
import { isEmpty } from "../utils/validate";
import Validate from "../components/common/Validate";
import { deleteItemStore, getItemStore, removeAcToken, saveItemStore, setAcToken } from "../utils/store";
import Checkbox from "../components/common/Checkbox";
import TextButton from "../components/common/TextButton";

const Login: React.FC = () => {
  const navigation = useNavigation<authNavi>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userNameErr, setUserNameErr] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [message, setMessage] = React.useState<messageType>(initMessage);

  React.useEffect(() => {
    removeAcToken()
    deleteItemStore("user");
    deleteItemStore("remember");
    getItemStore('remember').then((item: any) => {
      if (item) {
        let dataRemember = JSON.parse(JSON.parse(JSON.stringify(item)));
        if (dataRemember.remember) {
          getItemStore('user').then((dataStore) => {
            if (dataStore != null) {
              let dt = JSON.parse(JSON.parse(JSON.stringify(dataStore)));
              loginUser(dt.userName, dt.password);
            }
          });
        }
      }
    });
  }, []);

  const handleRemeberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      saveItemStore("remember", JSON.stringify({ remember: true }));
    }
  }

  const loginUser = async (userName: string, password: string) => {
    try {
      setIsLoading(true)
      let data = await login({
        username: userName,
        password: password,
        rememberMe: rememberMe
      })
      let dataUser = JSON.parse(JSON.stringify(data))
      if (dataUser) {
        setUserName("");
        setPassword("");
        await setAcToken(dataUser.id_token)
        saveItemStore("user", JSON.stringify(dataUser))
        navigation.navigate("ListTopic", { name: "ListTopic", isLogin: true });
      }
    } catch (error: any) {
      setMessage({
        message: `${error}`,
        type: 'error'
      })
    }
    setIsLoading(false)
  }

  const handleLogin = async () => {
    if (!checkValidate()) {
      loginUser(userName, password);
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
    return valid
  }

  const handleToSignUp = () => {
    navigation.navigate("SignUp", { name: "SignUp" });
  };

  const handleToForgotPassword = () => {
    navigation.navigate("ForgotPassword", { name: "ForgotPassword" });
  };

  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled={Platform.OS === "ios" ? true : false}
        >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View>
      <ImageBackground source={BACKGROUND_SOURCE} resizeMode="cover" >
          <View style={styles.screenView}>
            <Image style={styles.image} source={LOGO_SOURCE} />
            <Text style={styles.title}>{i18n.t("title.project")}</Text>
            <TextInput
              style={[styles.textInput, styles.formOval]}
              placeholder={i18n.t("placeholder.account")}
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

            <Checkbox
              isChecked={rememberMe}
              onChecked={handleRemeberMe}
              text={i18n.t("text.rememberMe")}
              styleText={styles.textCheck}
              styleBox={styles.boxCheck}
              size={SIZES.medium}
              color={COLORS.primary}
            />

            <TextButton
              style={[styles.btnLogin, styles.button, styles.formOval]}
              styleText={styles.btnText}
              text={i18n.t("text.login")}
              handlePress={handleLogin}
              disabled={isLoading}
            />
            
            <View style={styles.blockForgetPass}>
              <TextButton
                style={styles.btnForget}
                styleText={styles.textUnderline}
                text={i18n.t("text.forgetPassword")}
                handlePress={handleToForgotPassword}
                disabled={isLoading}
              />
            </View>

            <View style={styles.bottomScreen}>
              <View style={styles.divider} />
              <TextButton
                style={[styles.btnCreate, styles.button, styles.formOval]}
                styleText={styles.btnText}
                text={i18n.t("text.createAccount")}
                handlePress={handleToSignUp}
                disabled={isLoading}
              />
            </View>
            { isLoading && <ActivityIndicator style={styles.loading} size="large" color={COLORS.primary}/> }
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
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLogin: {
    backgroundColor: COLORS.primary,
    marginBottom: 10
  },
  btnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  btnForget: {

  },
  blockForgetPass: {
    width: 260,
    marginRight: 10,
    marginBottom: 30,
    textAlign: "right",
    alignItems: "flex-end",
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
  bottomScreen: {
    // position: "absolute",
    // bottom: 70
    marginBottom: -30
  },
  divider: {
    width: 260,
    height: 0.5,
    backgroundColor: COLORS.gray,
    marginTop: 70,
    marginBottom: 20
  },
  btnCreate: {
    backgroundColor: COLORS.gray2,
    marginTop: 30
  },
  loading: {
    position: "absolute",
    top: SCREEN_H/2,
    left: (SCREEN_W-40)/2
  },
  boxCheck: {
    width: 260,
    left: 10,
    marginTop: 10,
    marginBottom: 10
  },
  textCheck: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    marginLeft: 5
  },
});

export default Login;
