import * as React from "react";
import {StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView} from "react-native";
import { COLORS, SIZES } from "../../utils/constant";
import TextButton from "../common/TextButton";
import i18n from "../../locales/i18n";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { authNavi, messageType } from "../../types";
import { initMessage } from "../../utils/common";
import Message from "../common/Message";
import { deleteItemStore, removeAcToken } from "../../utils/store";

const PopupUser: React.FC<any> = (props) => {
  const navigation = useNavigation<authNavi>();
  const { show, user, closePopup } = props

  const [message, setMessage] = React.useState<messageType>(initMessage);

  const handletoAccount = () => {
    closePopup()
    if (user) {
      navigation.navigate("Account", {name: "Account"});
    } else {
      navigation.navigate("Login", { name: "Login" });
    }
  }

  const handleLoginLogout = () => {
    if (user) {
      handleLogout();
    } else {
      closePopup()
      navigation.navigate("Login", { name: "Login" });
    }
  }

  const handleLogout = async () => {
    try {
      removeAcToken()
      deleteItemStore("user");
      deleteItemStore("remember");
      closePopup();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: "Home"}]
        })
      )
    } catch (error: any) {
      setMessage({
        message: `${error}`,
        type: 'error'
      })
    }
  }

  return (
    <Modal
      transparent
      visible={show}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={closePopup}
    >
      <TouchableOpacity
        style={{flex:1, backgroundColor: COLORS.dim}}
        onPress={closePopup}
      >
        <View style={[styles.popupUser, styles.popupShadow]}>
            {user && <Text style={[styles.textBtn, styles.textName]}>
                {user ? user.name : ''}
            </Text>}
            <TextButton
                style={[styles.btnText, user ? styles.topBorder : null]}
                styleText={styles.textBtn}
                text={i18n.t("text.account")}
                handlePress={handletoAccount}
            />
            <TextButton
                style={[styles.btnText, styles.topBorder]}
                styleText={styles.textBtn}
                text={user ? i18n.t("text.logout") : i18n.t("text.login")}
                handlePress={handleLoginLogout}
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
      </TouchableOpacity>
    </Modal>
  );
}
export default PopupUser;

const styles = StyleSheet.create({
popupUser: {
  backgroundColor: COLORS.lightWhite,
  borderRadius: 12,
  position:'absolute',
  top: 90,
  right: 10,
},
popupShadow: {

},
topBorder: {
  borderTopWidth: 0.5,
},
btnText: {
  width: '100%',
  borderColor: COLORS.gray
},
textName: {
  maxWidth: 200,
  textAlign: "center",
  fontWeight: "bold"
},
textBtn: {
  padding: 10,
  textAlign: "center",
  color: COLORS.black,
  fontSize: SIZES.medium
}
})
