import React, { FC, Fragment } from "react";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TextInputProps } from "react-native";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { IInventories } from "../interfaces/IInventory";

interface props {
  fieldName: keyof IInventories;
  onPress?: () => void;
  fieldTitle?: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const FormFields: FC<props & TextInputProps> = ({
  fieldName,
  onPress,
  fieldTitle,
  icon,
  ...otherProps
}) => {
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<IInventories>();

  return (
    <Fragment>
      <AppTextInput
        onBlur={() => setFieldTouched(fieldName)}
        onChangeText={(text) => setFieldValue(fieldName, text)}
        value={values[fieldName]?.toString()}
        {...otherProps}
        icon={icon}
      />
      <ErrorMessage error={errors[fieldName]} visible={touched[fieldName]} />
    </Fragment>
  );
};

export default FormFields;
