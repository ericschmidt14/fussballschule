export interface FormValues {
  period: string;
  youth: string;
  time: string;
  childLastName: string;
  childFirstName: string;
  dob: Date | undefined;
  gender: string;
  club?: string;
  position?: string;
  misc?: string;
  size: string;
  parentLastName: string;
  parentFirstName: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  agree: boolean;
  name: string;
  iban: string;
  bic: string;
  conditions: boolean;
  privacy: boolean;
  recordings: boolean;
  processing: boolean;
}

export const getInitialValues = () => {
  return {
    period: "3",
    youth: "f",
    time: "1",
    childLastName: "",
    childFirstName: "",
    dob: undefined,
    gender: "male",
    club: "",
    position: "",
    misc: "",
    size: "128",
    parentLastName: "",
    parentFirstName: "",
    street: "",
    number: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    agree: false,
    name: "",
    iban: "",
    bic: "",
    conditions: false,
    privacy: false,
    recordings: false,
    processing: false,
  };
};
