import jwt_decode from "jwt-decode";
import { IUserData, getUserFromStorage } from "./localStorage";

export interface ITokenPayload {
  aud: string;
  exp: number;
  email: string;
  name: string;
  iss: string;
}

export const decodeToken: any = async () => {
  const token: IUserData = getUserFromStorage()!;
  if (!token) {
    return null;
  }

  const decoded = jwt_decode(token.token);

  return decoded;
};
