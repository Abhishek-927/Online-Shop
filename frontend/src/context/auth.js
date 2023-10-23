import axios from "axios";

const { useContext, useState, createContext, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: "",
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
