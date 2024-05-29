export interface FormValues {
  period: string;
  youth: string;
  time: string;
  child: {
    lastName: string;
    firstName: string;
    dob: Date;
    gender: string;
    club: string;
    position: string;
    misc: string;
    size: string;
  };
  parent: {
    lastName: string;
    firstName: string;
    street: string;
    number: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
  };
  agree: boolean;
  name: string;
  iban: string;
  bic: string;
  conditions: boolean;
  privacy: boolean;
  recordings: boolean;
  processing: boolean;
}
