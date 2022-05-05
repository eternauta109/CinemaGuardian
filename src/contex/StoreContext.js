import { createContext, useState } from "react";

export const CredentialContext = createContext();

export const StoreContext = ({ children }) => {
  const [cinemaName, setCinemaName] = useState([]);

  return (
    <CredentialContext.Provider
      value={{
        cinemaName
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

/* 
import { CredentialContext } from "../contex/StoreContext";
const { setUser, setCinemaObj } = useContext(CredentialContext);

*/
