import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string()
    .required()
    .min(4, "Description should be longer than 3 characters")
    .label("Description"),
  price: Yup.number()
    .required()
    .label("Price")
    .typeError("Price should be a number"),
  totalStock: Yup.number()
    .required()
    .label("Total stock")
    .typeError("Price should be a number"),
});
