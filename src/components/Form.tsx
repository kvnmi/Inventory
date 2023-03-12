import React, { FC } from "react";
import { Formik, FormikHelpers } from "formik";
import { IUser } from "../interfaces/IUser";
import { IInventories } from "../interfaces/IInventory";

type FormProps = {
  initialValues: IInventories;
  onSubmit: (
    values: IInventories,
    formikHelpers: FormikHelpers<IInventories>
  ) => void | Promise<any>;
  validationSchema?: (() => any) | any;
  children: React.ReactNode;
};

const AuthForm: FC<FormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AuthForm;
