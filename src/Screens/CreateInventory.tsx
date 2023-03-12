import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import {
  heightPixel,
  pixelSizeHorizontal,
  widthPixel,
} from "../config/normalise";
import { storeInventoryItem } from "../helpers/inventories";
import { IInventories } from "../interfaces/IInventory";
import Form from "../components/Form";
import Field from "../components/FormFields";
import SubmitButton from "../components/SubmitButton";
import Modal from "../components/Modal";
import { Image } from "react-native";
import { AppNavScreenProps } from "../Router/navTypes";
import AppText from "../components/AppText";
import colors from "../components/colors";
import { validationSchema } from "../config/formValidationSchema";
import useAuth from "../Auth/useAuth";

function ListingEditScreen({ navigation }: AppNavScreenProps<"CreateListing">) {
  const { user } = useAuth();

  const [failureModal, showFailureModal] = useState({
    active: false,
    message: "",
  });
  const [successModal, showSuccessModal] = useState<boolean>(false);
  const closeModal = () => showFailureModal({ ...failureModal, active: false });

  async function handleSubmit(data: IInventories) {
    const response = await storeInventoryItem(data, user!.uid);
    if (!response.status) {
      showFailureModal({
        active: true,
        message: response.message,
      });
    } else {
      showSuccessModal(true);
    }
  }

  return (
    <Screen style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo-red.png")} />
      <AppText style={styles.text}>Add Inventory Item</AppText>
      <Form
        initialValues={{
          description: "",
          name: "",
          price: "",
          id: "",
          totalStock: "",
        }}
        onSubmit={handleSubmit}
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

        <SubmitButton title="Submit" />
      </Form>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: pixelSizeHorizontal(15),
    alignItems: "center",
  },
  image: {
    height: heightPixel(80),
    width: widthPixel(80),
    marginVertical: pixelSizeHorizontal(35),
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    color: colors.blue,
  },
});

export default ListingEditScreen;
