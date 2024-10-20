import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storedData = JSON.parse(sessionStorage.getItem("user_data"));

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken, newData) => {
    sessionStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, user: newData })
    );

    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user_data");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };
  return (
    <userContext.Provider
      value={{ token, isAuthenticated, login, logout, userData }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

export default AuthContext;
