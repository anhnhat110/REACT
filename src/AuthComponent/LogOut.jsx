import "./LogOut.css";
import { logout } from "../Redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };
  return (
    <div>
      <button className="log-out" onClick={handleLogout}>
        <b>Log Out</b>
      </button>
    </div>
  );
}
