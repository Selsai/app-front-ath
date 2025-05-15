import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fetch("https://offers-api.digistos.com/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: Bearer ${token},
          },
        });
      } catch (error) {
      }
      dispatch(logout());
      navigate("/connexion");
    };

    handleLogout();
  }, []);

  return null; 
};

export default Logout;