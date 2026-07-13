import { useState, useEffect } from "react";
import * as api from "./api";

const PremiumStarIcon = ({ filled, size = 18 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={filled ? "url(#goldGradient)" : "none"} 
      stroke={filled ? "none" : "#cbd5e1"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{
        filter: filled ? "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.45))" : "none",
        transition: "all 0.2s ease"
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

function Favorites() {
  const [bookmarks, setBookmarks] = useState([]);

  const getUserId = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        return parsed.id;
      } catch (e) {}
    }
    return null;
  };

  const loadFavorites = () => {
    const userId = getUserId();
    api.getBookmarks(userId)
      .then((data) => {
        setBookmarks(data.filter((b) => b.favorite === true));
      })
      .catch((err) => {
        console.error("Failed to load favorites:", err);
      });
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const toggleFavorite = async (id) => {
    const target = bookmarks.find((b) => b._id === id || b.id === id);
    if (!target) return;
    
    const targetId = target._id || target.id;
    const isFav = target.favorite;
    const userId = getUserId();
    
    try {
      await api.toggleFavorite(targetId, isFav, userId);
      setBookmarks(bookmarks.filter((b) => b._id !== id && b.id !== id));
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const deleteBookmark = async (id) => {
    const target = bookmarks.find((b) => b._id === id || b.id === id);
    if (!target) return;
    
    const targetId = target._id || target.id;
    const userId = getUserId();
    
    try {
      await api.deleteBookmark(targetId, userId);
      setBookmarks(bookmarks.filter((b) => b._id !== id && b.id !== id));
    } catch (err) {
      console.error("Failed to delete bookmark:", err);
    }
  };

  const getDomain = (urlStr) => {
    try {
      const url = new URL(urlStr);
      return url.hostname.replace("www.", "");
    } catch {
      return urlStr;
    }
  };

  const getFullUrl = (urlStr) => {
    if (!urlStr) return "#";
    if (/^https?:\/\//i.test(urlStr)) {
      return urlStr;
    }
    return `https://${urlStr}`;
  };

  const getInitial = (title) => {
    return title ? title.charAt(0).toUpperCase() : "?";
  };

  const getColor = (title) => {
    const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["#1e70e6", "#475569", "#fb923c", "#10b981", "#ec4899", "#f97316", "#06b6d4", "#a855f7"];
    return colors[hash % colors.length];
  };

  return (
    <div className="container">
      <h2>Favorite Bookmarks</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Quick access to all your starred learning resources.
      </p>

      <div className="resources-grid">
        {bookmarks.map((bookmark) => (
          <div 
            key={bookmark._id || bookmark.id} 
            className="card-premium" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1rem",
              padding: "1rem"
            }}
          >
            {/* Circle Initial */}
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: getColor(bookmark.title),
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: "700",
              flexShrink: 0
            }}>
              {getInitial(bookmark.title)}
            </div>

            {/* Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", cursor: "pointer" }}>
                    {bookmark.title}
                  </h4>
                </a>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", margin: "0.1rem 0" }}>
                <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)" }}>
                  {getDomain(bookmark.url)} ↗
                </a> • <span style={{ color: "var(--text-secondary)" }}>{bookmark.course}</span>
              </p>
              <span className="badge badge-blue" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>
                {bookmark.category}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
              <button 
                onClick={() => toggleFavorite(bookmark._id || bookmark.id)} 
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px"
                }}
              >
                <PremiumStarIcon filled={bookmark.favorite} size={15} />
              </button>
              <a 
                href={getFullUrl(bookmark.url)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary" 
                style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem", textDecoration: "none" }}
              >
                Visit
              </a>
              <button 
                onClick={() => deleteBookmark(bookmark._id || bookmark.id)} 
                className="btn btn-danger" 
                style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem" }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookmarks.length === 0 && (
        <p style={{ fontStyle: "italic", color: "var(--text-secondary)", marginTop: "2rem", textAlign: "center" }}>
          You haven't starred any bookmarks yet. Click the star on the Dashboard to save favorites here!
        </p>
      )}
    </div>
  );
}

export default Favorites;
