import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [token, setToken] = useState(cookies.get("token") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        data
      );

      if (response.data.access_token) {
        toast.success("Login successful");
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user
        cookies.set("token", response.data.access_token, { expires: 7 });
        setUser(response.data.user);
        setToken(response.data.access_token);
        navigate("/profile");
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
   
    cookies.remove("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
