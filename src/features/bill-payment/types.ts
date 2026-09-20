import type { ImageSourcePropType } from "react-native";

export type BillCategory = {
  id: string;
  label: string;
  icon: ImageSourcePropType;
};

export type BillType = "prepaid" | "postpaid";

export type Biller = {
  id: string;
  name: string;
};

export type NetworkProvider = {
  id: string;
  name: string;
  logo: ImageSourcePropType;
};
