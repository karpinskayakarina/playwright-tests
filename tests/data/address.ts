import { faker } from "@faker-js/faker";

export type Address = {
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

export function makeAddress(partial?: Partial<Address>): Address {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    postalCode: faker.location.zipCode(),
    ...partial,
  };
}

export const defaultAddress: Address = makeAddress();
