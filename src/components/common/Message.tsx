import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS, SIZES, SCREEN_W } from "../../utils/constant";
import Icon from 'react-native-vector-icons/FontAwesome';
 


const Message: React.FC<any> = (props) => {
  const { visible, message, type, closeMessage } = props;

  return (
    <View style={styles.messageContainer}>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}
        style={styles.modalView}
      >
        <View style={ [type=='success'? styles.blockSuccess : styles.blockError, styles.block]}>
          <View style={styles.modalText}>
            <Text style={styles.messageText}>{ message }</Text>
          </View>
          <Pressable
            style={styles.buttonClose}
            onPress={() => closeMessage()}>
            <Icon name={'close'} size={SIZES.medium} color={COLORS.white}/>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "relative",
  },
  block: {
    position: "absolute",
    width: SCREEN_W - 40,
    bottom: 0,
    margin: 20,
    borderRadius: 15,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  blockError: {
    backgroundColor: 'rgba(253, 64, 64, 0.8)',
  },
  blockSuccess: {
    backgroundColor: 'rgba(76, 172, 0, 0.8)',
  },
  modalText: {
    width: '85%'
  },
  messageText: {
    color: COLORS.white,
  },
  buttonClose: {
    marginLeft: 10
  }
});
