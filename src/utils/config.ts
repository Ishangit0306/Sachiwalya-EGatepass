import {
  ADMIN_ROLE_TYPE,
  EMPLOYER_ROLE_TYPE,
  SECURITY_ROLE_TYPE,
  TYPE_ADMIN,
  TYPE_EMPLOYER,
  TYPE_PASSOFFICE,
  TYPE_SECURITY,
} from "../types";

export const API_BASE_URL = "https://iammaven.com";
//export const API_BASE_URL = 'http://103.37.80.69:3000';

export const USER_TYPE_EMPLOYEE: EMPLOYER_ROLE_TYPE = 2;
export const USER_TYPE_SECURITY: SECURITY_ROLE_TYPE = 1;
export const USER_TYPE_ADMIN: ADMIN_ROLE_TYPE = 3;
export const USER_TYPE_PASSOFFICE = 5;

export const ROLE_TYPE_EMPLOYEE: TYPE_EMPLOYER = "section";
export const ROLE_TYPE_SECURITY: TYPE_SECURITY = "gatepass";
export const ROLE_TYPE_ADMIN: TYPE_ADMIN = "admin";
export const ROLE_TYPE_PASSOFFICE: TYPE_PASSOFFICE = "passoffice";

const data = {
  section: USER_TYPE_EMPLOYEE,
    passoffice: USER_TYPE_SECURITY,
  gatepass: USER_TYPE_PASSOFFICE,
  //gatepass: USER_TYPE_SECURITY,
  //passoffice: USER_TYPE_PASSOFFICE,
  admin: USER_TYPE_ADMIN,
};

export function getValueByKey(key: string) {
  const obj: any = data;
  console.log("objectinfunc", key, obj);
  if (key in obj) {
    console.log("objectinfunc inside", obj[key]);
    return obj[key];
  }
  return null; // Return a default value if the key is not found.
}
