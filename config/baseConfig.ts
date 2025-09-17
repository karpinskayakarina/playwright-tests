import { config as dotenvConfig } from "dotenv";
import { join } from "path";

dotenvConfig({ path: join(process.cwd(), ".env") });

export const BASE_URL: string =
  process.env.BASE_URL ?? "https://practicesoftwaretesting.com";
export const API_URL: string =
  process.env.API_URL ?? "https://api.practicesoftwaretesting.com";
export const EMAIL: string =
  process.env.EMAIL ?? "customer@practicesoftwaretesting.com";
export const PASSWORD: string = process.env.PASSWORD!;
export const NAME: string = process.env.NAME ?? "Jane Doe";
