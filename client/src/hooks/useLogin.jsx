import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (values) => {
    axios.defaults.withCredentials = true;

    try {
      setError(null);
      setLoading(true);

      const res = await axios.post("/api/auth/signin", values);
      // console.log(res);

      if (res.status === 200) {
        // message.success(res.data.message);
        toast.success(res.data.message);
        login(res.data.token, res.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        setError(error.response.data.message);
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, loginUser };
};

export default useLogin;
