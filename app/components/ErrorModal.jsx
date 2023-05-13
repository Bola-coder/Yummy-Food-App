import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";
import IonIcons from "@expo/vector-icons/Ionicons";

const ErrorModal = ({ visible, messsage, handleClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={handleClose}
      animationType="slide"
      onPress={handleClose}
    >
      <View style={styles.modelContainer}>
        <View style={styles.modalContent}>
          <IonIcons
            name="close"
            size={40}
            color={"#FFAA00"}
            style={styles.modalCloseIcon}
            onPress={handleClose}
          />
          <Text style={styles.modalText}>An error occured.</Text>
          <Text style={styles.modalText}>{messsage}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
  },

  modalContent: {
    backgroundColor: "#FFaa00",
    backgroundColor: "#FFF",
    padding: 20,
    minHeight: "30%",
    width: "80%",
    borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 5,
    position: "relative",
  },

  modalCloseIcon: {
    position: "absolute",
    right: 20,
    top: 10,
  },

  modalText: {
    fontSize: 20,
    textAlign: "center",
    // color: "#fff",
    fontWeight: 700,
    marginTop: 30,
  },
});

export default ErrorModal;
