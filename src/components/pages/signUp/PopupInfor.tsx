import * as React from "react";
import {StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView} from "react-native";
import { COLORS, SCREEN_H, SCREEN_W, SIZES } from "../../../utils/constant";
import IconButton from "../../common/IconButton";
import TextButton from "../../common/TextButton";

const PopupInfor: React.FC<any> = (props) => {
  const { show, closePopup, textHeader, textContent, textConfirm, handleConfirm } = props

  return (
    <Modal
      transparent
      visible={show}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={closePopup} >
      <TouchableOpacity
        style={{flex:1, backgroundColor: COLORS.dim}}
        disabled={true} >
        <View style={styles.popupInfor}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{textHeader}</Text>
            <IconButton
              style={styles.btnClose}
              name={"times"}
              size={SIZES.medium}
              color={COLORS.primary}
              handlePress={closePopup}
            />
          </View>
          <ScrollView>
            <Text style={styles.text}>{textContent}</Text>
          </ScrollView>
          { textConfirm && <View style={styles.footer}>
            <TextButton
              style={styles.btnConfirm}
              styleText={styles.textBtn}
              text={textConfirm}
              handlePress={handleConfirm}
            />
          </View>}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
export default PopupInfor;

const styles = StyleSheet.create({
  styleModal: {
    flex: 1,
    
  },
  popupInfor: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 8,
    width: SCREEN_W*0.9,
    height: SCREEN_H*0.9,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    top: 45,
    left: (SCREEN_W - SCREEN_W*0.9)/2,
  },
  header: {
    width: '100%',
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.primary
  },
  textHeader: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontWeight: "bold"
  },
  btnClose: {
    position: "absolute",
    top: 5,
    right: 10
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'justify'
  },
  footer: {
    width: '100%',
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.primary
  },
  btnConfirm: {
    width: "40%",
    padding: 7,
    marginTop: 5,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: COLORS.green,
  },
  textBtn: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
})
