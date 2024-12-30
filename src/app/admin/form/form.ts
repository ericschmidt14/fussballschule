import { SoccerSchoolEntry } from "@/app/interfaces";

export const getInitialValues = (data: SoccerSchoolEntry) => {
  return {
    youth: data.youth,
    time: data.time,
    childLastName: data.childLastName,
    childFirstName: data.childFirstName,
    dob: new Date(data.dob),
    gender: data.gender,
    club: data.club,
    position: data.position,
    misc: data.misc,
    parentLastName: data.parentLastName,
    parentFirstName: data.parentFirstName,
    street: data.street,
    number: data.number,
    postalCode: data.postalCode,
    city: data.city,
    email: data.email,
    phone: data.phone,
    period: data.period,
    size: data.size,
    memberno: data.memberno,
    agree: data.agree,
    name: data.name,
    iban: data.iban,
    bic: data.bic,
    conditions: data.conditions,
    privacy: data.privacy,
    recordings: data.recordings,
    processing: data.processing,
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
  period: string;
  size: string;
  memberno: string;
  agree: boolean;
  name: string;
  iban: string;
  bic: string;
  conditions: boolean;
  privacy: boolean;
  recordings: boolean;
  processing: boolean;
}
