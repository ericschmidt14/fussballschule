export const getInitialValues = () => {
  return {
    period: "6",
    size: "128",
    memberno: "",
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
