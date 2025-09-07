export type Address = {
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

export const defaultAddress: Address = {
  street: "Main Street 1",
  city: "Kyiv",
  country: "Ukraine",
  postalCode: "01001",
};
