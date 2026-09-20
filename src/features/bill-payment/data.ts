import type { BillCategory, Biller, BillType, NetworkProvider } from "./types";

export const billCategories: BillCategory[] = [
  { id: "airtime", label: "Airtime", icon: require("../../../assets/images/bill-payment/airtime.png") },
  { id: "data", label: "Data", icon: require("../../../assets/images/bill-payment/data.png") },
  { id: "electricity", label: "Electricity", icon: require("../../../assets/images/bill-payment/electricity.png") },
  { id: "tv-cable", label: "TV Cable", icon: require("../../../assets/images/bill-payment/tv-cable.png") },
  { id: "betting", label: "Betting", icon: require("../../../assets/images/bill-payment/betting.png") },
];

// No real billing-aggregator integration exists yet — this mirrors the Figma
// mock with a short, believable list of Nigerian electricity discos.
export const ELECTRICITY_BILLERS: Biller[] = [
  { id: "aedc", name: "Abuja Electricity Distribution Plc" },
  { id: "ikeja-electric", name: "Ikeja Electric" },
  { id: "eko-electric", name: "Eko Electricity Distribution Company" },
  { id: "kano-electric", name: "Kano Electricity Distribution Company" },
];

export const BILL_TYPES: { value: BillType; label: string }[] = [
  { value: "prepaid", label: "Prepaid" },
  { value: "postpaid", label: "Postpaid" },
];

export const NETWORK_PROVIDERS: NetworkProvider[] = [
  { id: "mtn", name: "MTN", logo: require("../../../assets/images/bill-payment/networks/mtn.jpg") },
  { id: "airtel", name: "Airtel", logo: require("../../../assets/images/bill-payment/networks/airtel.png") },
  { id: "9mobile", name: "9mobile", logo: require("../../../assets/images/bill-payment/networks/nine-mobile.png") },
  { id: "glo", name: "GLO", logo: require("../../../assets/images/bill-payment/networks/glo.jpg") },
];
