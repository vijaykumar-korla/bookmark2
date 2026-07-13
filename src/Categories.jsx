import { useState, useEffect } from "react";
import * as api from "./api";

function Categories() {
  const [categoriesMap, setCategoriesMap] = useState({});

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

  const buildCategoriesMap = (list) => {
    const map = {};
    list.forEach((b) => {
      const cat = b.category || "General";
      if (!map[cat]) {
        map[cat] = [];
      }
      map[cat].push(b);
    });
    setCategoriesMap(map);
  };

  const loadCategories = () => {
    const userId = getUserId();
    api.getBookmarks(userId)
      .then((data) => {
        buildCategoriesMap(data);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const toggleFavorite = async (id) => {
    let target = null;
    let list = [];
    Object.values(categoriesMap).forEach((val) => {
      list = [...list, ...val];
      const found = val.find((b) => b._id === id || b.id === id);
      if (found) target = found;
    });

    if (!target) return;
    const targetId = target._id || target.id;
    const isFav = target.favorite;
    const userId = getUserId();

    try {
      await api.toggleFavorite(targetId, isFav, userId);
      const updatedList = list.map((b) => (b._id === id || b.id === id) ? { ...b, favorite: !isFav } : b);
      buildCategoriesMap(updatedList);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const deleteBookmark = async (id) => {
    let target = null;
    let list = [];
    Object.values(categoriesMap).forEach((val) => {
      list = [...list, ...val];
      const found = val.find((b) => b._id === id || b.id === id);
      if (found) target = found;
    });

    if (!target) return;
    const targetId = target._id || target.id;
    const userId = getUserId();

    try {
      await api.deleteBookmark(targetId, userId);
      const updatedList = list.filter((b) => b._id !== id && b.id !== id);
      buildCategoriesMap(updatedList);
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

  const categoryKeys = Object.keys(categoriesMap);

  return (
    <div className="container">
      <h2>Folder Categories</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Grouped view of all bookmarked pages categorized by format and target.
      </p>

      {categoryKeys.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "var(--text-secondary)", textAlign: "center" }}>
          No folders or categories cataloged yet.
        </p>
      ) : (
        categoryKeys.map((catName) => (
          <div key={catName} style={{ marginBottom: "3rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "0.5rem"
            }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{catName} ({categoriesMap[catName].length})</h3>
            </div>

            <div className="resources-grid">
              {categoriesMap[catName].map((bookmark) => (
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

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", cursor: "pointer" }}>
                          {bookmark.title}
                        </h4>
                      </a>
                      {bookmark.favorite && (
                        <span style={{ color: "#fbbf24", fontSize: "0.95rem" }}>★</span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", margin: "0.1rem 0" }}>
                      <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)" }}>
                        {getDomain(bookmark.url)} ↗
                      </a> • <span style={{ color: "var(--text-secondary)" }}>{bookmark.course}</span>
                    </p>
                  </div>

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
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Categories;
