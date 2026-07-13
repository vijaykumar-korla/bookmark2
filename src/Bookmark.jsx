import { useState, useEffect } from "react";
import * as api from "./api";

function Bookmark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState("Development");
  const [cost, setCost] = useState("Free");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

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

  // Load bookmarks on mount
  useEffect(() => {
    const userId = getUserId();
    api.getBookmarks(userId)
      .then((data) => {
        setBookmarks(data);
      })
      .catch((err) => {
        console.error("Failed to load bookmarks:", err);
      });
  }, []);

  const addBookmark = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !url) {
      setError("Title and URL are required.");
      return;
    }

    try {
      let formattedUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        formattedUrl = `https://${url}`;
      }
      new URL(formattedUrl);

      const bookmarkPayload = {
        title,
        url: formattedUrl,
        course: course || "General",
        category,
        cost,
        priority
      };

      const userId = getUserId();
      const added = await api.addBookmark(bookmarkPayload, userId);

      setBookmarks([added, ...bookmarks]);

      setTitle("");
      setUrl("");
      setCourse("");
      setCategory("Development");
      setCost("Free");
      setPriority("Medium");
    } catch (err) {
      setError(err.message || "Please enter a valid web URL.");
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

  const toggleFavorite = async (id) => {
    const target = bookmarks.find((b) => b._id === id || b.id === id);
    if (!target) return;
    
    const targetId = target._id || target.id;
    const isFav = target.favorite;
    const userId = getUserId();
    
    try {
      await api.toggleFavorite(targetId, isFav, userId);
      setBookmarks(bookmarks.map((b) => (b._id === id || b.id === id) ? { ...b, favorite: !isFav } : b));
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
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
    <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", alignItems: "start" }}>
      
      {/* Upload Column */}
      <div className="card-premium" style={{ position: "sticky", top: "90px" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem" }}>Add Bookmark Link 🔗</h3>
        
        {error && (
          <div style={{ color: "#ef4444", backgroundColor: "#fef2f2", padding: "0.5rem", borderRadius: "4px", fontSize: "0.85rem", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={addBookmark}>
          <div className="form-group">
            <label htmlFor="title">Link Title</label>
            <input
              type="text"
              id="title"
              className="input-field"
              placeholder="e.g. GitHub Repository"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Website URL</label>
            <input
              type="text"
              id="url"
              className="input-field"
              placeholder="e.g. github.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course Name / Tag</label>
            <input
              type="text"
              id="course"
              className="input-field"
              placeholder="e.g. CS50 Web"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              className="select-field" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Development">Development</option>
              <option value="Education">Education</option>
              <option value="Design">Design</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Marketing">Marketing</option>
              <option value="Career">Career</option>
              <option value="Productivity">Productivity</option>
              <option value="Resources">Resources</option>
              <option value="Videos">Videos</option>
              <option value="Courses">Courses</option>
              <option value="Practice">Practice</option>
              <option value="Tutorials">Tutorials</option>
              <option value="Tests">Tests</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="cost">Cost</label>
              <select 
                id="cost" 
                className="select-field" 
                value={cost} 
                onChange={(e) => setCost(e.target.value)}
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select 
                id="priority" 
                className="select-field" 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.65rem", marginTop: "0.5rem" }}>
            Upload Link
          </button>
        </form>
      </div>

      {/* List Column */}
      <div>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem" }}>My Bookmarks ({bookmarks.length})</h3>
        
        <div className="resources-grid" style={{ gridTemplateColumns: "1fr" }}>
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
              {/* Circle Initials logo */}
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

              {/* Bookmark details text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", cursor: "pointer" }}>
                      {bookmark.title}
                    </h4>
                  </a>
                  {bookmark.favorite && (
                    <span style={{ color: "#fbbf24", fontSize: "0.9rem" }}>★</span>
                  )}
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", margin: "0.1rem 0" }}>
                  <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)" }}>
                    {getDomain(bookmark.url)} ↗
                  </a> • <span style={{ color: "var(--text-secondary)" }}>{bookmark.course}</span>
                </p>
                <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.25rem" }}>
                  <span className="badge badge-blue" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>
                    {bookmark.category}
                  </span>
                  <span className="badge" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem", backgroundColor: "#f1f5f9", color: "var(--text-secondary)" }}>
                    {bookmark.priority} Priority
                  </span>
                </div>
              </div>

              {/* Action button controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
                <button 
                  onClick={() => toggleFavorite(bookmark._id || bookmark.id)} 
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    color: bookmark.favorite ? "#fbbf24" : "var(--text-tertiary)"
                  }}
                  title="Toggle Favorite"
                >
                  ★
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
                  title="Delete Bookmark"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {bookmarks.length === 0 && (
            <p style={{ fontStyle: "italic", color: "var(--text-secondary)", textAlign: "center", marginTop: "2rem" }}>
              Your workspace is empty. Add a website on the left to start!
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

export default Bookmark;
