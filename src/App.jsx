import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import Home from "./Home";
import Bookmark from "./Bookmark";
import Resources from "./Resources";
import Videos from "./Videos";
import Courses from "./Courses";
import Practice from "./Practice";
import Tutorials from "./Tutorials";
import Tests from "./Tests";
import Favorites from "./Favorites";
import AuthModal from "./AuthModal";
import { checkBackendStatus } from "./api";
import Dashboard from "./Dashboard";
import Development from "./Development";
import AiTools from "./AiTools";
import ProjectMentors from "./ProjectMentors";
import MernStack from "./MernStack";
import Contests from "./Contests";
import Profile from "./Profile";
import "./App.css";

function About() {
  return (
    <div className="container" style={{ maxWidth: "800px", marginTop: "2rem" }}>
      <div className="card-premium" style={{ padding: "3rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem", color: "var(--text-primary)" }}>About Bookmark Manager</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          This Bookmark Manager is a professional reference portal designed to help students, developers, and learners
          save, organize, and access their favorite learning websites in one central place.
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.7" }}>
          Register an account to open your Bookmarks Workspace, catalog your tutorials, and explore curated coding challenges.
        </p>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const loadSession = () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser({ name: storedUser, email: storedUser, id: "fallback" });
        }
      } else {
        const loggedUser = localStorage.getItem("logged_in_user");
        if (loggedUser) {
          setUser({ name: loggedUser, email: loggedUser, id: "fallback" });
        }
      }
    };

    loadSession();

    window.addEventListener("userProfileUpdated", loadSession);

    checkBackendStatus().then((online) => {
      setIsBackendOnline(online);
    });

    // Check periodically
    const interval = setInterval(() => {
      checkBackendStatus().then((online) => {
        setIsBackendOnline(online);
      });
    }, 15000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("userProfileUpdated", loadSession);
    };
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("logged_in_user", typeof userData === "object" ? userData.name : userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("logged_in_user");
  };

  const openAuth = (tabName) => {
    setAuthTab(tabName);
    setIsAuthOpen(true);
  };

  const getNavLinkStyle = ({ isActive }) => ({
    color: isActive ? "var(--accent-indigo)" : "var(--text-secondary)",
    fontWeight: isActive ? "600" : "500",
    fontSize: "0.9rem",
    padding: "0.45rem 0.9rem",
    borderRadius: "16px",
    backgroundColor: isActive ? "rgba(99, 102, 241, 0.06)" : "transparent",
    textDecoration: "none",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
  });

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* Translucent Glassmorphic Navigation Bar */}
        <header style={{
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            height: "70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1.5rem"
          }}>
            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: "0.55rem" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, var(--accent-indigo) 0%, #4338ca 100%)",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.35)",
                position: "relative"
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stacked overlapping premium bookmark ribbons */}
                  <path d="M19 5v14l-5-2.5-5 2.5V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z" fill="#ffffff" fillOpacity="0.3" />
                  <path d="M15 7v14l-5-2.5-5 2.5V7c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z" fill="#ffffff" />
                </svg>
              </div>
              <span style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                BookMark <span style={{ color: "var(--accent-indigo)" }}>Manager</span>
              </span>
            </Link>

            {/* Middle Nav Items */}
            <nav style={{ display: "flex", alignItems: "center" }}>
              {!user ? (
                /* Logged Out Links */
                <ul style={{ display: "flex", listStyle: "none", gap: "0.4rem", alignItems: "center", margin: 0, padding: 0 }}>
                  <li>
                    <NavLink to="/" end style={getNavLinkStyle}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/resources" style={getNavLinkStyle}>
                      Resources
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" style={getNavLinkStyle}>
                      About
                    </NavLink>
                  </li>
                </ul>
              ) : (
                /* Logged In Links */
                <ul style={{ display: "flex", listStyle: "none", gap: "0.4rem", alignItems: "center", margin: 0, padding: 0 }}>
                  <li>
                    <NavLink to="/" end style={getNavLinkStyle}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard" style={getNavLinkStyle}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/bookmark" style={getNavLinkStyle}>
                      My Bookmarks
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/favorites" style={getNavLinkStyle}>
                      Favorites
                    </NavLink>
                  </li>
                  <li 
                    onMouseEnter={() => setResourcesDropdownOpen(true)}
                    onMouseLeave={() => setResourcesDropdownOpen(false)}
                    style={{ position: "relative", display: "flex", alignItems: "center" }}
                  >
                    <NavLink 
                      to="/resources" 
                      style={(navState) => {
                        const baseStyle = getNavLinkStyle(navState);
                        if (resourcesDropdownOpen) {
                          baseStyle.backgroundColor = "rgba(99, 102, 241, 0.05)";
                          baseStyle.color = "var(--accent-indigo)";
                        }
                        return baseStyle;
                      }}
                    >
                      Resources <span style={{ fontSize: "0.65rem", marginLeft: "2px", opacity: 0.8 }}>▼</span>
                    </NavLink>

                    {resourcesDropdownOpen && (
                      <div style={{
                        position: "absolute",
                        top: "42px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#ffffff",
                        border: "1px solid var(--border-color)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
                        padding: "0.5rem",
                        minWidth: "170px",
                        zIndex: 1000,
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px"
                      }}>
                        <NavLink to="/resources" className="nav-dropdown-item">All Resources</NavLink>
                        <NavLink to="/development" className="nav-dropdown-item">Development Tools</NavLink>
                        <NavLink to="/aitools" className="nav-dropdown-item">AI Coding Tools</NavLink>
                        <NavLink to="/mentors" className="nav-dropdown-item">AI Project Mentors</NavLink>
                        <NavLink to="/mern" className="nav-dropdown-item">MERN Fullstack</NavLink>
                        <NavLink to="/videos" className="nav-dropdown-item">Videos</NavLink>
                        <NavLink to="/courses" className="nav-dropdown-item">Courses</NavLink>
                        <NavLink to="/practice" className="nav-dropdown-item">Practice</NavLink>
                        <NavLink to="/contests" className="nav-dropdown-item">Contests & Hackathons</NavLink>
                        <NavLink to="/tutorials" className="nav-dropdown-item">Tutorials</NavLink>
                        <NavLink to="/tests" className="nav-dropdown-item">Tests</NavLink>
                      </div>
                    )}
                  </li>
                </ul>
              )}
            </nav>

            {/* Right Buttons / Session User Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {!user ? (
                <>
                  <button onClick={() => openAuth("login")} className="btn btn-text" style={{ fontSize: "0.95rem", fontWeight: "500" }}>
                    Login
                  </button>
                  <button onClick={() => openAuth("register")} className="btn btn-primary" style={{ padding: "0.55rem 1.35rem", borderRadius: "var(--radius-sm)", fontSize: "0.95rem" }}>
                    Register
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                  {/* User Profile Trigger Button */}
                  <div 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "0.6rem", 
                      cursor: "pointer",
                      padding: "0.3rem 0.85rem 0.3rem 0.3rem",
                      borderRadius: "20px",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      backgroundColor: profileDropdownOpen ? "rgba(99, 102, 241, 0.04)" : "#ffffff",
                      boxShadow: "0 1px 2px 0 rgba(0,0,0,0.02)",
                      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.2)";
                      e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.9)";
                      e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.02)";
                    }}
                  >
                    {user.avatar && user.avatar.startsWith("data:image") ? (
                      <img 
                        src={user.avatar} 
                        alt="Avatar" 
                        style={{ 
                          width: "32px", 
                          height: "32px", 
                          borderRadius: "50%", 
                          objectFit: "cover" 
                        }} 
                      />
                    ) : user.avatar ? (
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "#f1f5f9",
                        border: "1px solid rgba(226, 232, 240, 0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.15rem"
                      }}>
                        {user.avatar}
                      </div>
                    ) : (
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(99, 102, 241, 0.08)",
                        color: "var(--accent-indigo)",
                        border: "1px solid rgba(99, 102, 241, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                        fontWeight: "700"
                      }}>
                        {((typeof user === "object" ? user.name : user) || "").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                      {typeof user === "object" ? user.name : user}
                    </span>

                    {/* Absolute Dropdown Popover */}
                    {profileDropdownOpen && (
                      <div style={{
                        position: "absolute",
                        top: "50px",
                        right: "0",
                        backgroundColor: "#ffffff",
                        border: "1px solid var(--border-color)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
                        padding: "0.5rem",
                        minWidth: "150px",
                        zIndex: 1000,
                        display: "flex",
                        flexDirection: "column"
                      }}
                      onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ padding: "0.4rem 0.75rem", borderBottom: "1px solid var(--border-color)", marginBottom: "0.4rem", textAlign: "left" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", display: "block" }}>Logged in as</span>
                          <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {typeof user === "object" ? user.name : user}
                          </strong>
                        </div>
                        <Link 
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          style={{ 
                            textDecoration: "none",
                            width: "100%", 
                            textAlign: "left", 
                            padding: "0.5rem 0.75rem", 
                            fontSize: "0.9rem", 
                            color: "var(--text-secondary)", 
                            cursor: "pointer",
                            borderRadius: "6px",
                            display: "block",
                            boxSizing: "border-box",
                            transition: "background 0.2s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = "#f1f5f9"}
                          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                        >
                          ⚙️ Settings
                        </Link>
                        <button 
                          onClick={handleLogout} 
                          className="nav-dropdown-item" 
                          style={{ 
                            border: "none", 
                            background: "none", 
                            width: "100%", 
                            textAlign: "left", 
                            padding: "0.5rem 0.75rem", 
                            fontSize: "0.9rem", 
                            color: "#ef4444", 
                            cursor: "pointer",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            boxSizing: "border-box",
                            transition: "background 0.2s ease",
                            marginTop: "0.2rem"
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = "#fef2f2"}
                          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Offline Status Warning Banner */}
        {!isBackendOnline && (
          <div style={{
            backgroundColor: "rgba(249, 115, 22, 0.08)",
            color: "#d97706",
            padding: "0.5rem 1.5rem",
            fontSize: "0.85rem",
            textAlign: "center",
            borderBottom: "1px solid rgba(249, 115, 22, 0.15)",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
          }}>
            <span>⚠️</span>
            <span><strong>Offline Mode:</strong> Connection to backend server (http://localhost:5000) failed. Changes will save in your browser.</span>
          </div>
        )}

        {/* Main Content Pane */}
        <main style={{ flex: 1, backgroundColor: "var(--bg-primary)" }}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="/bookmark" element={user ? <Bookmark /> : <Navigate to="/" replace />} />
            <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/" replace />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" replace />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/development" element={<Development />} />
            <Route path="/aitools" element={<AiTools />} />
            <Route path="/mentors" element={<ProjectMentors />} />
            <Route path="/mern" element={<MernStack />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid var(--border-color)",
          padding: "1.5rem 0",
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--text-tertiary)"
        }}>
          <div className="container" style={{ padding: "0 1.5rem" }}>
            &copy; {new Date().getFullYear()} Bookmark Manager. All rights reserved.
          </div>
        </footer>

        {/* Auth Modal Overlay */}
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onLoginSuccess={handleLoginSuccess}
          initialTab={authTab}
        />
      </div>
    </Router>
  );
}

export default App;
