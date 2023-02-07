import { Roles } from "./roles";

type User = {
  id?: number;
  password: string;
  email: string;
  emailConfirmed?: boolean
};
