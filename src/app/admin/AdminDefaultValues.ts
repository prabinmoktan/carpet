import { CheckoutFormValues } from "./AdminSchemas";

export const ProductDefaultValues = {
  title: "",
  category: "prayer-mat",
  price: 0,
  images: [],
  description: "",
  specs: {
    size: "",
    material: "",
    country: "",
  },
  stock: 0,
  isSale: false,
  sale: undefined,
  // isLatest: false,
  
};

export const UserLoginDefaultValues = {
  email: "",
  password: "",
};

export const UserRegisterDefaultvalues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};



export const checkoutDefaultValues: CheckoutFormValues = {
  contact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },

  shipping: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },

  payment: {
    method: "card",
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  },

  order: {
    notes: "",
    agreeToTerms: true,
  },

  billingSameAsShipping: true,
  billing: undefined,
};