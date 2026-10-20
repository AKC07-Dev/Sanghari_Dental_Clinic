export const clinicConfig = {
  name: "Sanghari Dental Clinic",
  city: "Shirpur",
  state: "Maharashtra",
  country: "India",
  phone: null as string | null,
  whatsappNumber: null as string | null,
  address: null as string | null,
  openingHours: null as string | null,
  minimumAdvanceNoticeDays: 1,
  preferredTimes: ["Morning", "Afternoon", "Evening"] as const,
  visitReasons: [
    "Root canal consultation",
    "Tooth pain",
    "General dental consultation",
    "Other",
  ] as const,
} as const;

export function getConfiguredWhatsAppNumber(): string | null {
  const number = clinicConfig.whatsappNumber?.replace(/\D/g, "") ?? "";
  return /^[1-9]\d{7,14}$/.test(number) ? number : null;
}