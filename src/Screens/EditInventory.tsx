import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";

import colors from "../components/colors";
import Form from "../components/Form";
import Field from "../components/FormFields";
import Screen from "../components/Screen";
import SubmitButton from "../components/SubmitButton";

import {
  fontPixel,
  heightPixel,
  normalise,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../config/normalise";
import { HomeStackScreenProps } from "../Router/navTypes";
import { deleteInventoryItem, editInventory } from "../helpers/inventories";
import { IInventories } from "../interfaces/IInventory";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../components/AppText";
import Modal from "../components/Modal";
import { validationSchema } from "../config/formValidationSchema";
import useAuth from "../Auth/useAuth";

export default function EditInventory({
  navigation,
  route,
}: HomeStackScreenProps<"EditListing">) {
  const { item } = route.params;
  const { user } = useAuth();

  const [failureModal, showFailureModal] = useState({
    active: false,
    message: "",
  });
  const [successModal, showSuccessModal] = useState<boolean>(false);
  const [deleteModal, showDeleteModal] = useState<boolean>(false);

  const closeModal = () => showFailureModal({ ...failureModal, active: false });

  async function handleUpdate(data: IInventories) {
    const response = await editInventory(data, user!.uid);
    if (!response.status) {
      showFailureModal({
        active: true,
        message: response.message,
      });
    } else {
      showSuccessModal(true);
    }
  }

  async function handleDelete() {
    await deleteInventoryItem(item.id, user!.uid);
    showDeleteModal(false);
    navigation.popToTop();
  }

  return (
    <Screen style={styles.container}>
      <Pressable style={styles.icon} onPress={navigation.goBack}>
        <MaterialCommunityIcons name="arrow-left" size={normalise(25)} />
      </Pressable>
      <Image style={styles.image} source={require("../assets/logo-red.png")} />
      <Form
        initialValues={{
          description: item.description,
          name: item.name,
          price: item.price,
          id: item.id,
          totalStock: item.totalStock,
        }}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
      >
        <Field
          fieldName="name"
          icon="card-text"
          maxLength={225}
          placeholder="Name"
          autoCapitalize="sentences"
          autoCorrect={true}
        />

        <Field
          fieldName="price"
          icon="cash"
          maxLength={8}
          placeholder="Price"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
        />
        <Field
          icon="counter"
          maxLength={8}
          placeholder="Stock"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          fieldName={"totalStock"}
        />
        <Field
          icon="card-text"
          placeholder="Description"
          autoCapitalize="sentences"
          numberOfLines={3}
          autoCorrect={true}
          fieldName={"description"}
        />

        <SubmitButton title="Update Item" />
      </Form>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => showDeleteModal(true)}
      >
        <AppText style={styles.deleteText}>Delete Item</AppText>
      </TouchableOpacity>

      <Modal
        isActive={failureModal.active}
        onClose={closeModal}
        onPress={closeModal}
        confirmText=""
        deleteText="Close"
        message={failureModal.message}
        imgType="failure"
      />
      <Modal
        isActive={successModal}
        onClose={() => showSuccessModal(false)}
        onPress={navigation.goBack}
        confirmText="View Listing"
        deleteText="Continue"
        message={"Inventory listing added successfully"}
      />
      <Modal
        isActive={deleteModal}
        onClose={() => showDeleteModal(false)}
        onPress={handleDelete}
        confirmText="Continue"
        deleteText="Cancel"
        message={"Are you sure you want to delete this item?"}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(15),
  },
  image: {
    height: heightPixel(80),
    width: widthPixel(80),
    marginBottom: pixelSizeHorizontal(35),
    alignSelf: "center",
  },
  deleteButton: {
    marginVertical: pixelSizeVertical(20),
    padding: normalise(20),
    alignSelf: "center",
  },
  deleteText: {
    color: colors.primary,
    fontSize: fontPixel(15),
    fontWeight: "700",
  },
  icon: {
    backgroundColor: colors.lightBlue,
    padding: normalise(5),
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: pixelSizeVertical(10),
  },
});
