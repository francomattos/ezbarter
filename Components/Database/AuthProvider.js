import React, { useContext, useState } from "react";
import { userDatabase, searchDatabase } from "./mockdata";

// Create a new Context object that will be provided to descendants of the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchData, setSearchData] = useState(searchDatabase);
  const [userData, setUserData] = useState(userDatabase);

  // The log in function takes an email and password and uses the Email/Password
  // authentication provider to log in.
  const logIn = async (email, password) => {
    var newUser = userData.filter(function (currentUser) {
      return currentUser.login === email;
    })[0];
    if (newUser && newUser.password === password) {
      setUser(newUser);
      return true;
    } else return false;
  };

  // Log out the current user.
  const logOut = () => {
    setUser(null);
  };

  //function to add item.
  const addItem = (itemname, description) => {
    idNumber = 100 + Math.floor(Math.random() * 1000);
    const dataToAdd = {
      userID: user.id,
      id: idNumber,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      zipcode: user.zipcode,
      itemname: itemname,
      requests: [],
      traded: "No",
      about: description,
    };
    setSearchData((searchData) => [...searchData, dataToAdd]);
  };

  //function to register new user.
  const addUser = (newUserInfo) => {
    setUserData((userData) => [...userData, newUserInfo]);
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        addItem,
        addUser,
        user,
        searchData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to access
// the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
