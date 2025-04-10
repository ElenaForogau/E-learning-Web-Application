import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/cursuri?search=${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm("");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">E-Learning</Link>
        </div>

        <div className="nav-links">
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Acasă
          </Link>

          <Link to="/cursuri" className={isActive("/cursuri") ? "active" : ""}>
            Cursuri
          </Link>

          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
            Contact
          </Link>

          <input
            type="text"
            placeholder="Cautare Cursuri"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />

          {user ? (
            <>
              <Link
                to={
                  user.role === "profesor"
                    ? "/profesor"
                    : user.role === "student"
                    ? "/student"
                    : "/"
                }
                className="dashboard"
              >
                Dashboard
              </Link>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={isActive("/login") ? "active" : ""}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
