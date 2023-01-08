import { Roles } from "./roles";

type User = {
  id?: number;
  login: string;
  password: string;
  email: string;
  emailConfirmed?: boolean
};
