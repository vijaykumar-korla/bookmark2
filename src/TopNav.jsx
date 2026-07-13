import { Link, NavLink, useNavigate } from "react-router-dom";
import "./TopNav.css";

function TopNav({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="topnav-header">
      <div className="topnav-container">
        <Link to="/" className="topnav-logo">
          Refereemark <span>🔖</span>
        </Link>
        
        <nav className="topnav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Home
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Explore
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            About
          </NavLink>
          {currentUser && (
            <NavLink to="/bookmark" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              Bookmarks
            </NavLink>
          )}
        </nav>

        <div className="topnav-actions">
          {currentUser ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {currentUser.name.split(" ")[0]}!</span>
              <button onClick={handleLogoutClick} className="btn btn-secondary btn-sm" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNav;
