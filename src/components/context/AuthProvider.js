import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export const AuthProvider = ({ children }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState();
  const [initials, setInitials] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userModal, setUserModal] = useState(false);
  const [error, setError] = useState("");

  const loginStatus = localStorage?.getItem("login");

  const { isUserLoggedIn, token: savedToken } = JSON.parse(loginStatus) || {
    isUserLoggedIn: false,
    token: null,
  };

  const [login, setLogin] = useState(isUserLoggedIn);
  const [token, setToken] = useState(savedToken);

  token && setupAuthHeaderForServiceCalls(token);

  const loginUser = async (req, res) => {
    console.log('working')
    try {
      const res = await axios.post('https://backend-nutriplay.pragyasabharwal.repl.co/login', {
        user: {
          username,
          password,
        },
      });
      if (res.status === 200) {
        console.log('successful')
        localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true, token: res.data.token })
        );
        setToken(res.data.token);
        setupAuthHeaderForServiceCalls(res.data.token);
        setLogin(true);
        navigate(state ? state.from : "/")
      }
      if (res.status === 401 || 404) {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        modal,
        setModal,
        token,
        setToken,
        initials,
        setInitials,
        setupAuthHeaderForServiceCalls,
        loginUser,
        username,
        password,
        setUsername,
        setPassword,
        userModal,
        setUserModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
