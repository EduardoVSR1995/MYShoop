import { createContext, useState } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [ userData, setUserData ] = useState({});
  let local = "/"+window.location.pathname.split("/")[1];
  const code = new URLSearchParams(window.location.search).get("code");
  
  function setValue(value, url) {    
    const item = window.localStorage.getItem(local);
    if( url ) {
      local = url;
    };
    if(item && value === undefined) {
      const obj = JSON.parse(item);
      setUserData( code ? { ...userData, ...obj, code: code } : { ...userData, ...obj } );
      return code ? { ...userData, ...obj, code: code } : { ...userData, ...obj };
    };
    if(value) {
      window.localStorage.setItem(local, JSON.stringify( code ? { ...value, code: code } : { ...value }));
      setUserData( code ? { ...userData, ...value, code: code } : { ...userData, ...value });
    }
    setUserData({ ...JSON.parse(item) });
    return { ...JSON.parse(item) };
  }

  return (
    <UserContext.Provider value={{ setValue, userData }}>
      {children}
    </UserContext.Provider>
  );
}
