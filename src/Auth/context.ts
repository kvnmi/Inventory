import React from "react";
import { IUser } from "../interfaces/IUser";

export interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
