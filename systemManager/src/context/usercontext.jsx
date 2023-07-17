import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const useUser = () => {
    return useContext(UserContext);
  };
  
  export const UserProvider = ({ children }) => {
      const [user, setUser] = useState();
  
      const getUser = () => {
          return user
      };
  
      const loguearse = (user) => {
          return setUser(user)
      };
  
    return <UserContext.Provider value={{ getUser, loguearse }}>{children}</UserContext.Provider>;
  };