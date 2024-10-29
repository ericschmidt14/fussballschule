export const getInitialValues = () => {
  return {
    youth: "k",
    time: "Mo",
    childLastName: "",
    childFirstName: "",
    dob: undefined,
    gender: "male",
    club: "",
    position: "",
    misc: "",
    parentLastName: "",
    parentFirstName: "",
    street: "",
    number: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    conditions: false,
  };
};

export interface FormValues {
  youth: string;
  time: string;
  childLastName: string;
  childFirstName: string;
  dob: Date | undefined;
  gender: string;
  club?: string;
  position?: string;
  misc?: string;
  parentLastName: string;
  parentFirstName: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  conditions: boolean;
}
