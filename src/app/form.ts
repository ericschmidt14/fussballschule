export const getInitialValues = () => {
  return {
    period: "3",
    youth: "f",
    time: "Mo",
    childLastName: "",
    childFirstName: "",
    dob: undefined,
    gender: "male",
    club: "",
    position: "",
    misc: "",
    size: "128",
    membership: "",
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
  membership?: string;
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

export interface SoccerSchoolEntry {
  id: number;
  lastName: string;
  firstName: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  name: string;
  period: string;
  iban: string;
  bic: string;
  agree: boolean;
  conditions: boolean;
  privacy: boolean;
  recordings: boolean;
  processing: boolean;
  created: string;
  mailing: null;
  confirmed: null;
  token: string;
  childs: Array<SoccerSchoolParticipant>;
}

export interface SoccerSchoolParticipant {
  id: number;
  parentId: number;
  youth: string;
  time: string;
  lastName: string;
  firstName: string;
  gender: string;
  club: string;
  position: string;
  size: string;
  misc: string;
  created: string;
}
