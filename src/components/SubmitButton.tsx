import React, { FC } from "react";
import { useFormikContext } from "formik";
import AppButtons from "./AppButton";
interface Props {
  title: string;
  disabled?: boolean;
}
const SubmitButton: FC<Props> = ({ title, disabled }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButtons title={title} onPress={handleSubmit} disabled={disabled} />
  );
};
export default SubmitButton;
