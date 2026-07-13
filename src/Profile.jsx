import { useState, useEffect, useRef } from "react";
import * as api from "./api";

function Profile() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  
  // Update Profile states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  const fileInputRef = useRef(null);



  const loadUserData = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setUsername(parsed.name || "");
        setEmail(parsed.email || "");
        setAvatar(parsed.avatar || "");
        
        api.checkBackendStatus().then(status => {
          setIsOnline(status);
        });

        api.getBookmarks(parsed.id).then(data => {
          setBookmarks(data);
        }).catch(err => console.error(err));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUpdateError("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // Base64 string
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");

    if (!username || !email) {
      setUpdateError("Username and Email are required.");
      return;
    }

    try {
      const payload = { name: username, email, avatar };
      if (password) {
        if (password !== confirmPassword) {
          setUpdateError("Passwords do not match.");
          return;
        }
        payload.password = password;
      }

      const result = await api.updateProfile(user.id || user._id, payload);
      
      // Update local currentUser storage
      const updatedUserSession = {
        id: user.id,
        name: result.user.name,
        email: result.user.email,
        avatar: result.user.avatar
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUserSession));
      
      setUser(updatedUserSession);
      setPassword("");
      setConfirmPassword("");
      setUpdateSuccess("Profile updated successfully!");

      // Dispatch event to update App header navigation state
      window.dispatchEvent(new Event("userProfileUpdated"));
    } catch (err) {
      setUpdateError(err.message || "Failed to update profile settings.");
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ textAlign: "center", marginTop: "4rem" }}>
        <p>Loading user profile...</p>
      </div>
    );
  }

  const totalSaved = bookmarks.length;
  const totalFavorites = bookmarks.filter(b => b.favorite).length;

  const categoriesCount = bookmarks.reduce((acc, b) => {
    const cat = b.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  // Helper to render the Avatar Image/Emoji
  const renderAvatar = (size = "90px", fontSize = "2.4rem") => {
    if (avatar && avatar.startsWith("data:image")) {
      return (
        <img 
          src={avatar} 
          alt="DP" 
          style={{ 
            width: size, 
            height: size, 
            borderRadius: "50%", 
            objectFit: "cover", 
            border: "3px solid #ffffff",
            boxShadow: "0 8px 16px rgba(0,0,0,0.12)"
          }} 
        />
      );
    }
    if (avatar) {
      return (
        <div style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
          border: "2px solid rgba(226, 232, 240, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fontSize,
          boxShadow: "0 8px 16px rgba(0,0,0,0.06)"
        }}>
          {avatar}
        </div>
      );
    }
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-blue) 100%)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fontSize,
        fontWeight: "800",
        boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.35)"
      }}>
        {getInitial(user.name)}
      </div>
    );
  };

  return (
    <div className="container" style={{ maxWidth: "950px", paddingBottom: "4rem" }}>
      <h2>Profile & Settings</h2>
      <p style={{ margin: "0.5rem 0 2.5rem 0", color: "var(--text-secondary)" }}>
        Customize your display picture, manage credentials, reset safety passwords, and view catalog analytics.
      </p>

      {/* Styled Inputs CSS Inject */}
      <style>{`
        .profile-settings-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }
        .settings-input {
          width: 100%;
          padding: 0.7rem 0.95rem;
          border-radius: 10px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          background-color: #f8fafc;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .settings-input:focus {
          outline: none;
          border-color: var(--accent-indigo);
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .btn-save-settings {
          padding: 0.65rem 1.5rem;
          border-radius: 10px;
          border: none;
          background: var(--accent-indigo);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-save-settings:hover {
          background: #4338ca;
          transform: translateY(-1px);
        }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", alignItems: "start" }}>
        
        {/* Left Side: Avatar Panel */}
        <div className="profile-settings-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2.5rem 1.5rem" }}>
          
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            {renderAvatar("90px", "2.4rem")}
          </div>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.2rem" }}>
            {user.name}
          </h3>
          <span style={{
            fontSize: "0.7rem",
            backgroundColor: "rgba(99, 102, 241, 0.08)",
            color: "var(--accent-indigo)",
            fontWeight: "800",
            borderRadius: "20px",
            padding: "0.2rem 0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "1.5rem"
          }}>
            Premium Member
          </span>

          <div style={{ width: "100%", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", textAlign: "left" }}>
            <div>
              <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: "0.75rem" }}>Active Email</span>
              <strong style={{ color: "var(--text-primary)" }}>{user.email}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-tertiary)", display: "block", fontSize: "0.75rem" }}>Connection Status</span>
              <strong style={{ color: isOnline ? "#059669" : "#d97706", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: isOnline ? "#10b981" : "#f59e0b", display: "inline-block" }}></span>
                {isOnline ? "Online Database Connected" : "Local Browser Fallback"}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Side: Account Settings Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Main Edit Settings Form */}
          <div className="profile-settings-card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Profile Settings</h3>
            
            {updateError && (
              <div style={{ color: "#ef4444", backgroundColor: "#fef2f2", padding: "0.65rem 0.85rem", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1.25rem", fontWeight: "500", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
                {updateError}
              </div>
            )}
            {updateSuccess && (
              <div style={{ color: "#16a34a", backgroundColor: "#f0fdf4", padding: "0.65rem 0.85rem", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1.25rem", fontWeight: "500", border: "1px solid rgba(22, 163, 74, 0.1)" }}>
                {updateSuccess}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Display Picture (DP) Controller */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase" }}>Profile Picture (DP)</label>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  
                  {/* Photo upload trigger */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <button 
                      type="button" 
                      onClick={triggerFileInput} 
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        borderRadius: "8px",
                        border: "1px solid rgba(226, 232, 240, 1)",
                        backgroundColor: "#ffffff",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#f8fafc"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
                    >
                      Upload Custom Photo
                    </button>
                    {avatar && (
                      <button 
                        type="button" 
                        onClick={() => setAvatar("")}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ef4444",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        Remove Picture
                      </button>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      style={{ display: "none" }} 
                    />
                  </div>

                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label htmlFor="username" style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569", marginBottom: "0.4rem", display: "block" }}>Username</label>
                  <input
                    type="text"
                    id="username"
                    className="settings-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569", marginBottom: "0.4rem", display: "block" }}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="settings-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "1rem" }}>Change Password (Optional)</h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label htmlFor="pass" style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569", marginBottom: "0.4rem", display: "block" }}>New Password</label>
                    <input
                      type="password"
                      id="pass"
                      className="settings-input"
                      placeholder="Leave blank to keep current"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="conf" style={{ fontSize: "0.75rem", fontWeight: "700", color: "#475569", marginBottom: "0.4rem", display: "block" }}>Confirm New Password</label>
                    <input
                      type="password"
                      id="conf"
                      className="settings-input"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                <button type="submit" className="btn-save-settings">
                  Save Changes
                </button>
              </div>

            </form>
          </div>

          {/* Folder Breakdown */}
          <div className="profile-settings-card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.25rem" }}>Folder Breakdown</h3>
            {totalSaved === 0 ? (
              <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--text-tertiary)", margin: 0 }}>No folder records cataloged yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {Object.entries(categoriesCount).map(([cat, count]) => {
                  const percent = (count / totalSaved) * 100;
                  return (
                    <div key={cat}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                        <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>{cat}</span>
                        <span style={{ color: "var(--text-secondary)", fontWeight: "500" }}>{count} links ({percent.toFixed(0)}%)</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "var(--accent-indigo)", borderRadius: "3px" }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;
