export interface IUser {
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserWithId extends IUser {
  id: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export default interface IUserService {
  login(login: ILogin): Promise<string | null>;
}
