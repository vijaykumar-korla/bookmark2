import { useState, useEffect } from "react";
import * as api from "./api";
import ResourceCard from "./ResourceCard";

// Reusable Official Brand SVG Logos
const BrandIcon = ({ name, size = 24 }) => {
  const cleanName = (name || "").toLowerCase();
  
  if (cleanName.includes("github")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    );
  }
  if (cleanName.includes("coursera")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#0056D2" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    );
  }
  if (cleanName.includes("leetcode")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFA116" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.483 0a1.374 1.374 0 00-.961.414l-9.8 9.8a1.375 1.375 0 000 1.956l1.376 1.376a1.375 1.375 0 001.956 0l9.8-9.8a1.375 1.375 0 000-1.956L14.444.414A1.374 1.374 0 0013.483 0zm4.566 6.305l-4.566 4.565 1.956 1.956 4.565-4.566-1.955-1.955zm-8.8 8.8l-1.956 1.956 4.566 4.565 1.956-1.956-4.566-4.565z" />
      </svg>
    );
  }
  if (cleanName.includes("figma")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2h3v5H8V2zm3 5V2h3c1.38 0 2.5 1.12 2.5 2.5S15.38 7 14 7h-3zm0 0h3c1.38 0 2.5 1.12 2.5 2.5S15.38 12 14 12h-3V7zM8 7h3v5H8V7zm0 5h3v5H8v-5zm3 5V12h3c1.38 0 2.5 1.12 2.5 2.5S15.38 17 14 17h-3zm-3 0c0 1.38 1.12 2.5 2.5 2.5H11v-5H8v2.5z" fill="#F24E1E" />
      </svg>
    );
  }
  if (cleanName.includes("chatgpt") || cleanName.includes("openai") || cleanName.includes("ai tools")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#10a37f" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5 10.3c.4-.3.6-.8.6-1.3 0-1.1-.9-2-2-2-.3 0-.7.1-1 .2C17.7 5.7 16.3 4.5 14.7 4.5c-1 0-1.9.5-2.5 1.3-.6-.8-1.5-1.3-2.5-1.3-1.6 0-3 1.2-3.4 2.7-.3-.1-.6-.2-1-.2-1.1 0-2 .9-2 2 0 .5.2 1 .6 1.3C2.8 11.2 2 12.8 2 14.5c0 2.2 1.8 4 4 4 .2 0 .5 0 .7-.1C7.2 19.8 8.8 21 10.7 21c1.3 0 2.4-.6 3.1-1.5.7.9 1.8 1.5 3.1 1.5 1.9 0 3.5-1.2 3.9-2.9.2 0 .5.1.7.1 2.2 0 4-1.8 4-4 0-1.7-.8-3.3-1.9-4.2zM12 19c-1.3 0-2.4-.7-3-1.8l1.7-1c.4.6 1 .8 1.3.8 1.1 0 2-.9 2-2v-1.7l1.7 1V16c0 1.7-1.3 3-3 3zm-3.3-3.6L7 14.4V12.7l1.7 1v1.7zm1.3-4.7l1.7-1v1.7l-1.7 1V10.7zm4.3 3.7l-1.7-1v-1.7l1.7 1v1.7zm-1.3-4.7l-1.7 1V9.7l1.7-1v2zm-3-1.8c.6 0 1.2.3 1.5.8l-1.7 1c-.1-.1-.3-.2-.5-.2-.6 0-1 .4-1 1v1.7l-1.7-1V9.5c0-1.7 1.3-3 3-3zm8.3 5.3l-1.7 1V12.7l1.7-1v1.8zm-1.7-3.2c0-.6-.3-1.2-.8-1.5l1-1.7c.9.5 1.5 1.5 1.5 2.6 0 .3 0 .5-.1.8l-1.7-1c.1-.1.1-.1.1-.2z" />
      </svg>
    );
  }
  if (cleanName.includes("stack overflow")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFA500" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.986 21.865v-6.435h2.24v8.675H2.766v-8.675h2.24v6.435h13.98zM8.334 14.28l8.368 1.745.364-2.21-8.368-1.746-.364 2.21zm1.254-4.576l7.464 4.09 1.096-2L10.684 7.7l-1.096 2.004zm2.593-5.326l5.776 6.17 1.637-1.532-5.777-6.17-1.636 1.532zm3.87-3.928l-2.008 1.01 3.513 6.963 2.01-1.01-3.515-6.963zM7.947 19.365h8.544V17.12H7.947v2.245z" />
      </svg>
    );
  }
  if (cleanName.includes("mongodb")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#13aa52" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1C9 3.5 8.5 7.5 8.5 10c0 4.5 2.5 7.5 3.5 11 1-3.5 3.5-6.5 3.5-11 0-2.5-.5-6.5-3.5-9zm0 18c-.8-2-2.5-4.5-2.5-8 0-1.8.3-4.8 2.5-7 2.2 2.2 2.5 5.2 2.5 7 0 3.5-1.7 6-2.5 8z" />
      </svg>
    );
  }
  if (cleanName.includes("youtube") || cleanName.includes("video")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (cleanName.includes("linkedin")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  if (cleanName.includes("mdn") || cleanName.includes("mozilla")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 3h19v18h-19V3zm14.7 13.5v-7h-2.1v7h2.1zm-4.7 0v-4.8c0-.9-.6-1.5-1.4-1.5s-1.3.6-1.3 1.5v4.8H5.6v-7H7.7v1.1c.4-.7 1.3-1.3 2.2-1.3 1.6 0 2.9 1.2 2.9 2.8v4.4h-2.1z" />
      </svg>
    );
  }
  // Default Globe SVG
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

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

function Dashboard() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Add Bookmark states
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newCategory, setNewCategory] = useState("Development");
  const [newCost, setNewCost] = useState("Free");
  const [newPriority, setNewPriority] = useState("Medium");
  const [addError, setAddError] = useState("");

  // Retrieve user session and bookmarks
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        
        api.getBookmarks(parsed.id)
          .then((data) => {
            setBookmarks(data);
          })
          .catch((err) => {
            console.error("Failed to load bookmarks:", err);
          });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAddBookmark = async (e) => {
    e.preventDefault();
    setAddError("");

    if (!newTitle || !newUrl) {
      setAddError("Please provide a title and URL.");
      return;
    }

    try {
      let formattedUrl = newUrl;
      if (!/^https?:\/\//i.test(newUrl)) {
        formattedUrl = `https://${newUrl}`;
      }
      new URL(formattedUrl);

      const bookmarkPayload = {
        title: newTitle,
        url: formattedUrl,
        course: newCourse || "General",
        category: newCategory,
        cost: newCost,
        priority: newPriority
      };

      const userId = user ? user.id : null;
      const added = await api.addBookmark(bookmarkPayload, userId);
      
      setBookmarks([added, ...bookmarks]);

      // Reset
      setNewTitle("");
      setNewUrl("");
      setNewCourse("");
      setNewCategory("Development");
      setNewCost("Free");
      setNewPriority("Medium");
      setIsAddOpen(false);
    } catch (err) {
      setAddError(err.message || "Invalid URL format.");
    }
  };

  const toggleFavorite = async (id) => {
    const target = bookmarks.find((b) => b._id === id || b.id === id);
    if (!target) return;
    
    const targetId = target._id || target.id;
    const isFav = target.favorite;
    const userId = user ? user.id : null;
    
    try {
      await api.toggleFavorite(targetId, isFav, userId);
      setBookmarks(bookmarks.map((b) => (b._id === id || b.id === id) ? { ...b, favorite: !isFav } : b));
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const deleteBookmark = async (id) => {
    const target = bookmarks.find((b) => b._id === id || b.id === id);
    if (!target) return;
    
    const targetId = target._id || target.id;
    const userId = user ? user.id : null;
    
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

  const searchFilter = (b) => {
    return b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           b.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (b.course || "").toLowerCase().includes(searchQuery.toLowerCase());
  };

  const categories = [
    { name: "Development", color: "#2563eb", description: "Tech stacks, frameworks, & APIs" },
    { name: "Education", color: "#059669", description: "Reference roadmaps & tutorials" },
    { name: "Design", color: "#d946ef", description: "UI patterns, assets, & templates" },
    { name: "AI Tools", color: "#0d9488", description: "Copilots & generative assistants" },
    { name: "Marketing", color: "#ea580c", description: "SEO tools, analytics, & copy assets" },
    { name: "Career", color: "#4f46e5", description: "Job boards, resumes, & networking" },
    { name: "Productivity", color: "#06b6d4", description: "Notes, calendars, & time trackers" },
    { name: "Resources", color: "#84cc16", description: "Asset packs, datasets, & libraries" },
    { name: "Videos", color: "#ef4444", description: "Playlists, screencasts, & lecture recordings" },
    { name: "Courses", color: "#8b5cf6", description: "Bootcamps, universities, & learning paths" },
    { name: "Practice", color: "#f59e0b", description: "Algorithm quizzes & coding challenges" },
    { name: "Tutorials", color: "#10b981", description: "Step-by-step docs & dev guides" },
    { name: "Tests", color: "#64748b", description: "Aptitude tests & screening certificates" }
  ];

  const getBookmarksByCategory = (cat) => {
    return bookmarks.filter((b) => b.category === cat && searchFilter(b));
  };

  // Curated fallback reference cards in search
  const localCuratedSites = [
    { title: "GitHub", description: "Collaborative repository hosting for git.", url: "https://github.com", type: "Development", cost: "Free" },
    { title: "LeetCode", description: "Solve data structure and coding algorithms.", url: "https://leetcode.com", type: "Practice", cost: "Free" },
    { title: "v0 Vercel", description: "Generative UI code helper for web designs.", url: "https://v0.dev", type: "AI Tool", cost: "Free" }
  ];

  const filteredCurated = searchQuery
    ? localCuratedSites.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      
      {/* Component Styles Injection */}
      <style>{`
        /* Premium Statistics Cards */
        .premium-stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(226, 232, 240, 0.7);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .premium-stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 4px;
          background: var(--stat-glow, var(--accent-indigo));
        }
        .premium-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.02);
          border-color: rgba(99, 102, 241, 0.15);
        }

        /* Folder Columns */
        .premium-folder-column {
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 20px;
          padding: 1.5rem;
          min-height: 480px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.01);
        }
        .premium-folder-column:hover {
          background: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.03), 0 8px 10px -6px rgba(0,0,0,0.02);
          border-color: var(--hover-border, rgba(99,102,241,0.2));
        }

        /* Hover row interaction */
        .premium-bookmark-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.5);
          box-shadow: 0 1px 2px rgba(0,0,0,0.01);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .premium-bookmark-row:hover {
          transform: translateY(-2px);
          border-color: var(--row-border-hover, rgba(99,102,241,0.15));
          box-shadow: 0 4px 12px -2px rgba(0,0,0,0.03);
        }

        /* Sleek Button Glows */
        .btn-sleek-add {
          background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
          color: #ffffff;
          font-weight: 600;
          border: none;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
          transition: all 0.2s ease;
        }
        .btn-sleek-add:hover {
          box-shadow: 0 6px 14px rgba(79, 70, 229, 0.3);
          transform: translateY(-1px);
        }

        /* Custom scrollbar for column lists */
        .column-bookmark-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          overflow-y: auto;
          max-height: 500px;
          padding-right: 2px;
        }
        .column-bookmark-list::-webkit-scrollbar {
          width: 4px;
        }
        .column-bookmark-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
      `}</style>

      {/* Control Header Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1.5rem",
        marginBottom: "2.5rem",
        flexWrap: "wrap",
        paddingBottom: "1.5rem",
        borderBottom: "1px solid rgba(226, 232, 240, 0.8)"
      }}>
        {/* Left Search input */}
        <div style={{ display: "flex", gap: "0.5rem", flex: 1, maxWidth: "450px", position: "relative" }}>
          <input
            type="text"
            placeholder="🔍 Filter bookmarks or find curated assets..."
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: "0.75rem 1.25rem", 
              fontSize: "0.95rem", 
              borderRadius: "12px", 
              border: "1px solid rgba(226, 232, 240, 0.9)",
              backgroundColor: "#f8fafc"
            }}
          />
        </div>

        {/* Right add bookmark trigger */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button onClick={() => setIsAddOpen(true)} className="btn btn-primary btn-sleek-add" style={{ fontWeight: "600", padding: "0.75rem 1.75rem", borderRadius: "12px" }}>
            + Add Bookmark
          </button>
        </div>
      </div>

      {/* Premium Statistics Cockpit Row */}
      {!searchQuery && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          {/* Folders Summary */}
          <div className="premium-stat-card" style={{ "--stat-glow": "#3b82f6" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", backgroundColor: "rgba(59, 130, 246, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
              📁
            </div>
            <div>
              <h5 style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.15rem" }}>Total Folders</h5>
              <p style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--text-primary)", lineHeight: 1.2 }}>{categories.length} Categories</p>
            </div>
          </div>

          {/* Bookmarks Summary */}
          <div className="premium-stat-card" style={{ "--stat-glow": "#6366f1" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", backgroundColor: "rgba(99, 102, 241, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
              🔗
            </div>
            <div>
              <h5 style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.15rem" }}>Total Links</h5>
              <p style={{ fontSize: "1.4rem", fontWeight: "700", color: "#4f46e5", lineHeight: 1.2 }}>{bookmarks.length} Saved</p>
            </div>
          </div>

          {/* Starred Summary */}
          <div className="premium-stat-card" style={{ "--stat-glow": "#fbbf24" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", backgroundColor: "rgba(251, 191, 36, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
              ⭐
            </div>
            <div>
              <h5 style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.15rem" }}>Starred Items</h5>
              <p style={{ fontSize: "1.4rem", fontWeight: "700", color: "#d97706", lineHeight: 1.2 }}>{bookmarks.filter(b => b.favorite).length} Favorites</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Board Layout */}
      {searchQuery ? (
        /* ================= SEARCH RESULTS VIEW ================= */
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.5rem" }}>Search results for "{searchQuery}"</h3>
          
          {/* User Bookmarks Matching Search */}
          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "1rem", color: "var(--text-secondary)" }}>Your Bookmarks</h4>
            <div className="resources-grid">
              {bookmarks.filter(searchFilter).map((bookmark) => (
                <div key={bookmark._id || bookmark.id} className="premium-bookmark-row" style={{ "--row-border-hover": "rgba(99,102,241,0.2)" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid var(--border-color)", backgroundColor: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <BrandIcon name={bookmark.title} size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                      <h4 style={{ fontSize: "0.875rem", fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", margin: 0 }}>
                        {bookmark.title}
                      </h4>
                    </a>
                    <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", margin: "0.1rem 0 0 0" }}>{getDomain(bookmark.url)} • {bookmark.category}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                    <button onClick={() => toggleFavorite(bookmark._id || bookmark.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}>
                      <PremiumStarIcon filled={bookmark.favorite} size={15} />
                    </button>
                    <button onClick={() => deleteBookmark(bookmark._id || bookmark.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center", padding: "4px" }}>🗑</button>
                  </div>
                </div>
              ))}
              {bookmarks.filter(searchFilter).length === 0 && (
                <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--text-tertiary)" }}>No matching personal bookmarks found.</p>
              )}
            </div>
          </div>

          {/* Curated Sites Matching Search */}
          {filteredCurated.length > 0 && (
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "1rem", color: "var(--text-secondary)" }}>Curated Resources Suggestions</h4>
              <div className="resources-grid">
                {filteredCurated.map((site) => (
                  <ResourceCard key={site.title} {...site} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= MULTI-COLUMN FOLDER GRID ================= */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          alignItems: "start"
        }}>
          {categories.map((cat) => {
            const catBookmarks = getBookmarksByCategory(cat.name);
            return (
              <div 
                key={cat.name}
                className="premium-folder-column"
                style={{ "--hover-border": cat.color }}
              >
                {/* Column Folder Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: `2px solid ${cat.color}25`
                }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--text-primary)" }}>
                      {cat.name}
                    </span>
                  </div>
                  <span style={{
                    backgroundColor: `${cat.color}15`,
                    color: cat.color,
                    fontSize: "0.725rem",
                    fontWeight: "800",
                    borderRadius: "12px",
                    padding: "0.2rem 0.65rem"
                  }}>
                    {catBookmarks.length}
                  </span>
                </div>
                
                {/* Subtitle helper description */}
                <p style={{ fontSize: "0.725rem", color: "var(--text-tertiary)", marginTop: 0, marginBottom: "1.25rem" }}>
                  {cat.description}
                </p>

                {/* Column Scrollable Bookmark list */}
                <div className="column-bookmark-list">
                  {catBookmarks.map((bookmark) => (
                    <div
                      key={bookmark._id || bookmark.id}
                      className="premium-bookmark-row"
                      style={{ "--row-border-hover": cat.color }}
                    >
                      {/* Logo Icon */}
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: "1px solid rgba(226, 232, 240, 0.8)",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <BrandIcon name={bookmark.title} size={16} />
                      </div>

                      {/* Info details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                          <h4 style={{
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            marginBottom: "0.1rem",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            cursor: "pointer"
                          }}>
                            {bookmark.title}
                          </h4>
                        </a>
                        <p style={{
                          fontSize: "0.7rem",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          margin: 0
                        }}>
                          <a href={getFullUrl(bookmark.url)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)" }}>
                            {getDomain(bookmark.url)} ↗
                          </a>
                        </p>
                      </div>

                      {/* Hover action handlers */}
                      <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                        <button
                          onClick={() => toggleFavorite(bookmark._id || bookmark.id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            padding: "4px",
                            transition: "transform 0.2s ease"
                          }}
                          title="Favorite"
                        >
                          <PremiumStarIcon filled={bookmark.favorite} size={15} />
                        </button>
                        <button
                          onClick={() => deleteBookmark(bookmark._id || bookmark.id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            color: "#f87171",
                            padding: "2px",
                            transition: "color 0.2s ease"
                          }}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ))}

                  {catBookmarks.length === 0 && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2.5rem 1rem",
                      border: "1px dashed rgba(226, 232, 240, 0.8)",
                      borderRadius: "12px",
                      marginTop: "1.5rem"
                    }}>
                      <span style={{ fontSize: "1.3rem", filter: "grayscale(100%)", marginBottom: "0.5rem" }}>📂</span>
                      <p style={{
                        fontSize: "0.75rem",
                        color: "var(--text-tertiary)",
                        fontStyle: "italic",
                        textAlign: "center",
                        margin: 0
                      }}>
                        Folder is empty
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Professional Add Bookmark Modal overlay window */}
      {isAddOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "480px" }}>
            <button 
              onClick={() => setIsAddOpen(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                fontSize: "1.3rem",
                cursor: "pointer",
                color: "var(--text-tertiary)"
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "0.25rem", color: "var(--text-primary)" }}>New Bookmark Link</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Organize web references into your cockpit folder columns.</p>
            
            {addError && (
              <div style={{ color: "#ef4444", backgroundColor: "#fef2f2", padding: "0.6rem 0.85rem", borderRadius: "8px", fontSize: "0.825rem", marginBottom: "1.25rem", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
                {addError}
              </div>
            )}

            <form onSubmit={handleAddBookmark}>
              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="title" style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Link Title</label>
                <input
                  type="text"
                  id="title"
                  className="input-field"
                  placeholder="e.g. GitHub Repository"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ borderRadius: "10px", padding: "0.65rem 1rem" }}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="url" style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Website URL</label>
                <input
                  type="text"
                  id="url"
                  className="input-field"
                  placeholder="e.g. github.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  style={{ borderRadius: "10px", padding: "0.65rem 1rem" }}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="course" style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Course Tag / Label</label>
                <input
                  type="text"
                  id="course"
                  className="input-field"
                  placeholder="e.g. Full-Stack MERN"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  style={{ borderRadius: "10px", padding: "0.65rem 1rem" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="category" style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Folder Column</label>
                <select 
                  id="category" 
                  className="select-field" 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ borderRadius: "10px", padding: "0.65rem" }}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="form-group">
                  <label htmlFor="cost" style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Cost</label>
                  <select 
                    id="cost" 
                    className="select-field" 
                    value={newCost} 
                    onChange={(e) => setNewCost(e.target.value)}
                    style={{ borderRadius: "10px", padding: "0.65rem" }}
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority" style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Priority</label>
                  <select 
                    id="priority" 
                    className="select-field" 
                    value={newPriority} 
                    onChange={(e) => setNewPriority(e.target.value)}
                    style={{ borderRadius: "10px", padding: "0.65rem" }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-sleek-add" style={{ width: "100%", padding: "0.75rem", borderRadius: "12px", fontSize: "0.95rem" }}>
                Create Bookmark
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
