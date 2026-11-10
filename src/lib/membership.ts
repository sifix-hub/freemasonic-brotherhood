type Field = {
  name: string;
  label: string;
  autoComplete?: string;
  type?: "email" | "tel" | "number" | "textarea";
  maxLength: number;
  optional?: boolean;
};

export const membershipFields = [
  { name: "fullName", label: "Full name", autoComplete: "name", maxLength: 120 },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", maxLength: 254 },
  { name: "phone", label: "Phone or WhatsApp (with country code)", type: "tel", autoComplete: "tel", maxLength: 32 },
  { name: "country", label: "Country", autoComplete: "country-name", maxLength: 100 },
  { name: "city", label: "City or town", autoComplete: "address-level2", maxLength: 100 },
  { name: "age", label: "Age", type: "number", maxLength: 3, optional: true },
  { name: "occupation", label: "Occupation", maxLength: 120, optional: true },
  { name: "referral", label: "Who referred you?", maxLength: 120, optional: true },
  { name: "motivation", label: "Why would you like to join?", type: "textarea", maxLength: 1500 },
] as const satisfies readonly Field[];

export type FieldName = (typeof membershipFields)[number]["name"];
type FieldErrors = Partial<Record<FieldName | "privacyAcknowledged", string>>;

export const isApplicationId = (value: unknown): value is string =>
  typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);

export function validateMembership(input: Record<string, unknown>) {
  const values = {} as Record<FieldName, string>;
  const errors: FieldErrors = {};

  for (const definition of membershipFields) {
    const field: Field = definition;
    const raw = input[definition.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    values[definition.name] = value;
    if (!value && !field.optional) errors[definition.name] = "Complete this required field.";
    else if (value.length > field.maxLength) errors[definition.name] = "Use " + field.maxLength + " characters or fewer.";
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.phone && (!/^\+?[\d\s().-]+$/.test(values.phone) || !/^\d{7,15}$/.test(values.phone.replace(/\D/g, "")))) {
    errors.phone = "Enter a valid phone number, including its country code.";
  }
  if (values.age && (!/^\d{1,3}$/.test(values.age) || Number(values.age) < 1 || Number(values.age) > 120)) {
    errors.age = "Enter an age between 1 and 120.";
  }
  if (input.privacyAcknowledged !== true) errors.privacyAcknowledged = "Confirm that you have read the privacy notice.";

  return { values, errors };
}
