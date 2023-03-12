import { useContext } from "react";

import jwtDecode from "jwt-decode";
import AuthContext from "./context";
import storage from "./storage";
import { IUser } from "../interfaces/IUser";

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    storage.deleteUser();
  };

  const logIn = (user: IUser) => {
    setUser(user);
    storage.storeUser(user);
  };

  return { user, logOut, logIn };
}
