import { useState, useEffect } from "react";
import { login, register } from "./api";

function AuthModal({ isOpen, onClose, onLoginSuccess, initialTab = "login" }) {
  const [tab, setTab] = useState(initialTab); // "login" or "register"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setMessage("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (tab === "register") {
        if (!username || !email || !password) {
          setError("Please fill in all fields.");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        
        await register(username, email, password);
        setMessage("Account created successfully! Please log in.");
        setTab("login");
        setPassword("");
        setConfirmPassword("");
      } else {
        // Login
        if (!email || !password) {
          setError("Please fill in all fields.");
          return;
        }
        const result = await login(email, password);
        onLoginSuccess(result.user);
        onClose();
      }
    } catch (err) {
      setError(err.message || "Authentication failed.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(8, 10, 20, 0.48)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      
      {/* Local Styles Injection */}
      <style>{`
        .auth-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 2.75rem 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 
            0 30px 60px -15px rgba(0, 0, 0, 0.08), 
            0 0 50px -10px rgba(99, 102, 241, 0.04),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(226, 232, 240, 0.7);
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Subtle premium mesh glow effect at the top */
        .auth-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #4f46e5 0%, #3b82f6 50%, #6366f1 100%);
        }
        
        /* Pill segment selection switcher */
        .auth-tab-pill-box {
          display: flex;
          background: #f1f5f9;
          border-radius: 14px;
          padding: 0.25rem;
          margin-bottom: 2rem;
          position: relative;
          border: 1px solid rgba(226, 232, 240, 0.5);
        }
        .auth-tab-btn {
          flex: 1;
          padding: 0.65rem 0;
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 11px;
          z-index: 1;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .auth-tab-btn.active {
          color: #4f46e5;
          background: #ffffff;
          box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }

        .auth-input-label {
          font-size: 0.725rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 0.45rem;
          display: block;
        }

        .auth-input-wrapper {
          position: relative;
        }

        .auth-input {
          width: 100%;
          padding: 0.75rem 2.6rem 0.75rem 2.6rem;
          font-size: 0.925rem;
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          background-color: #f8fafc;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-sizing: border-box;
          color: #1e293b;
        }
        .auth-input::placeholder {
          color: #94a3b8;
        }
        .auth-input:focus {
          outline: none;
          border-color: #4f46e5;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
        }

        .auth-input-icon-left {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          alignItems: center;
          color: #94a3b8;
          pointer-events: none;
          transition: color 0.2s ease;
        }
        .auth-input:focus + .auth-input-icon-left {
          color: #4f46e5;
        }

        .btn-auth-submit {
          width: 100%;
          padding: 0.8rem;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          background: #4f46e5;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 20px -4px rgba(79, 70, 229, 0.3);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 1rem;
        }
        .btn-auth-submit:hover {
          background: #4338ca;
          box-shadow: 0 12px 24px -4px rgba(79, 70, 229, 0.45);
          transform: translateY(-1.5px);
        }
        .btn-auth-submit:active {
          transform: translateY(0);
        }

        /* Divider lines for premium SaaS sign in style */
        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: #94a3b8;
          font-size: 0.725rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 1.5rem 0;
        }
        .auth-divider::before,
        .auth-divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        }
        .auth-divider:not(:empty)::before {
          margin-right: .75rem;
        }
        .auth-divider:not(:empty)::after {
          margin-left: .75rem;
        }
      `}</style>

      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            fontSize: "1.3rem",
            cursor: "pointer",
            color: "#94a3b8",
            padding: "4px",
            lineHeight: 1,
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.color = "#475569"}
          onMouseLeave={(e) => e.target.style.color = "#94a3b8"}
        >
          ✕
        </button>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, var(--accent-indigo) 0%, #4338ca 100%)",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            marginBottom: "0.75rem",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5v14l-5-2.5-5 2.5V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z" fill="#ffffff" fillOpacity="0.3" />
              <path d="M15 7v14l-5-2.5-5 2.5V7c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z" fill="#ffffff" />
            </svg>
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#1e293b", margin: 0, letterSpacing: "-0.03em" }}>
            {tab === "login" ? "Welcome Back" : "Create Account"}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem", marginBottom: 0 }}>
            {tab === "login" ? "Sign in to manage your premium directories." : "Get started with your custom personal cockpit."}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="auth-tab-pill-box">
          <button
            onClick={() => { 
              setTab("login"); 
              setUsername(""); 
              setEmail(""); 
              setPassword(""); 
              setConfirmPassword(""); 
              setError(""); 
              setMessage(""); 
            }}
            className={`auth-tab-btn ${tab === "login" ? "active" : ""}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { 
              setTab("register"); 
              setUsername(""); 
              setEmail(""); 
              setPassword(""); 
              setConfirmPassword(""); 
              setError(""); 
              setMessage(""); 
            }}
            className={`auth-tab-btn ${tab === "register" ? "active" : ""}`}
          >
            Register
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div style={{ 
            color: "#ef4444", 
            backgroundColor: "#fef2f2", 
            border: "1px solid rgba(239, 68, 68, 0.12)", 
            padding: "0.65rem 0.85rem", 
            borderRadius: "12px", 
            fontSize: "0.825rem", 
            marginBottom: "1.25rem",
            fontWeight: "500"
          }}>
            {error}
          </div>
        )}

        {/* Success Message Notification */}
        {message && (
          <div style={{ 
            color: "#16a34a", 
            backgroundColor: "#f0fdf4", 
            border: "1px solid rgba(22, 163, 74, 0.12)", 
            padding: "0.65rem 0.85rem", 
            borderRadius: "12px", 
            fontSize: "0.825rem", 
            marginBottom: "1.25rem",
            fontWeight: "500"
          }}>
            {message}
          </div>
        )}

        {/* Decorative Divider */}
        <div className="auth-divider">Secure Portal</div>

        <form onSubmit={handleSubmit}>
          {/* Username Input (Register Only) */}
          {tab === "register" && (
            <div className="form-group" style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="username" className="auth-input-label">Username</label>
              <div className="auth-input-wrapper">
                <input
                  type="text"
                  id="username"
                  className="auth-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span className="auth-input-icon-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="form-group" style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="email" className="auth-input-label">Email Address</label>
            <div className="auth-input-wrapper">
              <input
                type="email"
                id="email"
                className="auth-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="auth-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group" style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="password" className="auth-input-label">Password</label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="auth-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  padding: 0
                }}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input (Register Only) */}
          {tab === "register" && (
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="confirmPassword" className="auth-input-label">Confirm Password</label>
              <div className="auth-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="auth-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="auth-input-icon-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    padding: 0
                  }}
                >
                  {showConfirmPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button type="submit" className="btn-auth-submit">
            {tab === "login" ? "Sign In" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
