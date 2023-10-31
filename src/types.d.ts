import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type EMPLOYER_ROLE_TYPE = 2;
export type SECURITY_ROLE_TYPE = 1;
export type ADMIN_ROLE_TYPE = 3;
export type PASSOFFICE_ROLE_TYPE = 5;

export type TYPE_SECURITY = 'gatepass';
export type TYPE_EMPLOYER = 'section';
export type TYPE_ADMIN = 'admin';
export type TYPE_PASSOFFICE = 'passoffice';






type RootStackParamList = {
  HomeScreen: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomeScreen'>;

type LeaderboardMode = 'alltime' | 'weekly';
type AuthFormType = 'login' | 'register' | 'forgot';

export interface UserAuthFormType {
  key: number | string;
  title: string;
  type: AuthFormType;
}

export interface User {
  id: number;
  etype:number
  userName?: string;
  email?: string;
  departmentName?: string;
  departmentId?: string | number;
  edesignation?:string,
  fk_eid_caters?:string|number,
  ephone?:string
}

export interface LoginValues {
  userName: string;
  password: string;
}

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: string | number |null;
  isLoggedIn: boolean;
  sendSmsStatus?: boolean,
  smsSendToNumber?: number | null,
}

export type UserFormData={
  name:string,
  address:string,
  contactNumber:string,
  gender:string,
  visitorId:number| string
  pic:string
  uid:string
  typeOfId:number
  email:string
}
export type UserState={
  user:UserFormData;
}


export type AppointmentInitialState = {
  documentPhoto: any,
  visitorPhoto: any,
  name?: string | null,
  idNo?: string | number | null,
  uploadedImgId?: number | null
}

export type VisitorsFormState = {
  visitorId: number | string,
  firstName: string,
  lastName: string,
  address: string,
  contactNumber: string,
  date: string | number,
  time: string,
  visitPurpose: string,
  departmentName: string,
  employeeId: string | number,
  documentType: string | number,
  visitorStatus: 'pending' | 'accepted' | 'rejected'
};

export interface VisitorState {
  visitorList: VisitorsFormState[];
}

export type RootState = {
  authentication: AuthState;
  appointment: AppointmentInitialState;
  visitors: VisitorState;
  user:UserFormData;
};


