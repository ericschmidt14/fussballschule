export interface SoccerSchoolEntry {
  parentToken: string;
  parentLastName: string;
  parentFirstName: string;
  memberno: string;
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
  parentCreated: string;
  confirmed: string | null;
  started: string | null;
  ended: string | null;
  billing: string | null;
  youth: string;
  time: string;
  childLastName: string;
  childFirstName: string;
  gender: string;
  dob: string;
  club: string;
  position: string;
  size: string;
  misc: string;
  mailing: string;
  mailing1: string | null;
  mailing2: string | null;
  mailing3: string | null;
  childCreated: string;
  childToken: string;
}

export interface Group {
  label: string;
  value: string;
  min: number;
  max: number;
  times: string;
}
