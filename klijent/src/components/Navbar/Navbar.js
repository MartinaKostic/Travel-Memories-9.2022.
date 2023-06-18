import "./Navbar.css";
import { FaMapPin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Navbar({ logged, LoggedIn }) {
  const history = useHistory();
  const LocalstorageUserId = localStorage.getItem("userid");
  const Signout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    history.push("/");
    LoggedIn();
  };

  return (
    <nav className="navbar">
      <div className="logotip">
        <FaMapPin className="ikona" />
        <h1>Travel Memories</h1>
      </div>
      {logged ? (
        <div className="navigation">
          <NavLink activeClassName="active" to="/feed">
            Feed
          </NavLink>
          <NavLink activeClassName="active" to={"/user/" + LocalstorageUserId}>
            Profile
          </NavLink>
          <button activeClassName="active" onClick={Signout}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="navigation">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/signup">
            Sign Up
          </NavLink>
          <NavLink activeClassName="active" to="/signin">
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
}
