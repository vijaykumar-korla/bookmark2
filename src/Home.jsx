import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

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
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#F48024" xmlns="http://www.w3.org/2000/svg">
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
  if (cleanName.includes("canva")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#00C4CC" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <text x="5" y="16" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>
      </svg>
    );
  }
  if (cleanName.includes("notion")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 3h15v18h-15z" fill="#ffffff"/>
        <path d="M6 5v14h12V5H6zm2 2h3.5v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" fill="#000000"/>
      </svg>
    );
  }
  // Default Globe SVG
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

function Home({ user }) {
  // Auth trigger inside landing hero
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Dynamic sliding featured resources state
  const [currentSlidePage, setCurrentSlidePage] = useState(0);

  // Default Featured Resources (12 items for alternating dynamic change)
  const featuredResourcesList = [
    // Page 1
    { title: "Coursera", url: "https://www.coursera.org", description: "Online courses from top universities.", category: "Education", brand: "coursera" },
    { title: "GitHub", url: "https://github.com", description: "Build and ship software together.", category: "Development", brand: "github" },
    { title: "LeetCode", url: "https://leetcode.com", description: "Prepare for technical interviews.", category: "Development", brand: "leetcode" },
    { title: "ChatGPT", url: "https://chatgpt.com", description: "AI assistant for coding productivity.", category: "AI Tools", brand: "chatgpt" },
    { title: "Figma", url: "https://figma.com", description: "Collaborative interface design tool.", category: "Design", brand: "figma" },
    { title: "Stack Overflow", url: "https://stackoverflow.com", description: "Find answers to technical questions.", category: "Development", brand: "stack overflow" },
    // Page 2
    { title: "Canva", url: "https://canva.com", description: "Design anything and publish anywhere.", category: "Design", brand: "canva" },
    { title: "Notion", url: "https://notion.so", description: "All-in-one workspace for notes and tasks.", category: "Productivity", brand: "notion" },
    { title: "MongoDB", url: "https://mongodb.com", description: "Modern NoSQL database for applications.", category: "Database", brand: "mongodb" },
    { title: "MDN Web Docs", url: "https://developer.mozilla.org", description: "Official web standards documentation.", category: "Development", brand: "mdn" },
    { title: "YouTube Education", url: "https://www.youtube.com", description: "Free online educational video courses.", category: "Video", brand: "youtube" },
    { title: "LinkedIn", url: "https://www.linkedin.com", description: "Professional networking and connections.", category: "Professional", brand: "linkedin" }
  ];

  // Rotate pages automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlidePage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const visibleFeaturedResources = currentSlidePage === 0 
    ? featuredResourcesList.slice(0, 6) 
    : featuredResourcesList.slice(6, 12);

  // ----------------------------------------------------
  // Interactive Product Demo Mockup Widget (Hero Section)
  // ----------------------------------------------------
  const [demoBookmarks, setDemoBookmarks] = useState([
    { id: 1, title: "GitHub Link", url: "https://github.com", brand: "github" },
    { id: 2, title: "LeetCode Practice", url: "https://leetcode.com", brand: "leetcode" },
    { id: 3, title: "ChatGPT Workspace", url: "https://chatgpt.com", brand: "chatgpt" }
  ]);
  const [demoQuery, setDemoQuery] = useState("");
  const [demoTitle, setDemoTitle] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [demoError, setDemoError] = useState("");

  const handleAddDemo = (e) => {
    e.preventDefault();
    setDemoError("");
    if (!demoTitle || !demoUrl) {
      setDemoError("Fill in Title and URL!");
      return;
    }
    const cleanUrl = /^https?:\/\//i.test(demoUrl) ? demoUrl : `https://${demoUrl}`;
    const newDemo = {
      id: Date.now(),
      title: demoTitle,
      url: cleanUrl,
      brand: demoTitle.toLowerCase()
    };
    setDemoBookmarks([...demoBookmarks, newDemo]);
    setDemoTitle("");
    setDemoUrl("");
  };

  const filteredDemo = demoBookmarks.filter(b => 
    b.title.toLowerCase().includes(demoQuery.toLowerCase()) ||
    b.url.toLowerCase().includes(demoQuery.toLowerCase())
  );

  const getDomain = (urlStr) => {
    try {
      const url = new URL(urlStr);
      return url.hostname.replace("www.", "");
    } catch {
      return urlStr;
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      
      {/* Radial Gradient Glow behind Hero Section */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "1400px",
        height: "580px",
        background: "radial-gradient(circle at 75% 35%, rgba(30, 112, 230, 0.08) 0%, rgba(248, 250, 252, 0) 65%)",
        pointerEvents: "none",
        zIndex: -1
      }}></div>

      <div className="container">
        
        {/* Hero Banner Grid */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "3.5rem",
          padding: "4rem 0 5rem 0",
          flexWrap: "wrap"
        }}>
          {/* Left text options */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <span className="badge badge-blue" style={{
              padding: "0.45rem 1rem",
              borderRadius: "50px",
              fontSize: "0.825rem",
              fontWeight: "600",
              marginBottom: "1.5rem"
            }}>
              Your personal collection, always at hand
            </span>

            <h1 style={{
              fontSize: "3.2rem",
              lineHeight: "1.15",
              fontWeight: "800",
              color: "var(--text-primary)",
              margin: "1rem 0 1.5rem 0"
            }}>
              Save, Organize & Access Your <span style={{ color: "var(--accent-blue)" }}>Favorite Websites</span>
            </h1>

            <p style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              marginBottom: "2.5rem"
            }}>
              Store your important links securely in one place and access them anytime, anywhere.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {user ? (
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: "0.75rem 1.75rem", borderRadius: "6px", fontSize: "0.95rem", fontWeight: "600", textAlign: "center" }}>
                  Go to Dashboard →
                </Link>
              ) : (
                <button onClick={() => setIsAuthOpen(true)} className="btn btn-primary" style={{ padding: "0.75rem 1.75rem", borderRadius: "6px", fontSize: "0.95rem", fontWeight: "600" }}>
                  Get Started →
                </button>
              )}
              <Link to="/resources" className="btn btn-secondary" style={{ padding: "0.75rem 1.75rem", borderRadius: "6px", fontSize: "0.95rem", fontWeight: "600", textAlign: "center" }}>
                Explore Resources
              </Link>
            </div>
          </div>

          {/* Right Live Interactive Mockup Demo Widget */}
          <div style={{ flex: 1, minWidth: "300px", maxWidth: "520px" }}>
            <div className="mockup-frame" style={{ border: "1px solid #1e70e6", boxShadow: "0 10px 25px rgba(30,112,230,0.12)" }}>
              <div className="mockup-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <div className="mockup-dot" style={{ backgroundColor: "#ef4444" }}></div>
                  <div className="mockup-dot" style={{ backgroundColor: "#fbbf24" }}></div>
                  <div className="mockup-dot" style={{ backgroundColor: "#22c55e" }}></div>
                </div>
                <span className="badge badge-blue" style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem", borderRadius: "20px" }}>
                  Live Demo Widget
                </span>
              </div>

              {/* Interactive Demo Search */}
              <div style={{ marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="Try searching inside this demo..."
                  value={demoQuery}
                  onChange={(e) => setDemoQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 10px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    marginBottom: 0
                  }}
                />
              </div>

              {/* Demo List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {filteredDemo.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <div className="mockup-row" style={{ padding: "0.65rem 1rem", margin: 0 }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "10px", display: "flex", alignItems: "center" }}><BrandIcon name={item.brand} size={18} /></div>
                        <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>{item.title}</span>
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "var(--accent-blue)" }}>{getDomain(item.url)} ↗</span>
                    </div>
                  </a>
                ))}
                {filteredDemo.length === 0 && (
                  <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontStyle: "italic", textAlign: "center", padding: "1rem 0" }}>
                    No results match your demo search.
                  </div>
                )}
              </div>

              {/* Mini Demo Add Link Form */}
              <form onSubmit={handleAddDemo} style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: "700", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>
                  Add a link directly to test this preview:
                </p>
                
                {demoError && (
                  <div style={{ color: "#ef4444", fontSize: "0.65rem", marginBottom: "0.25rem" }}>{demoError}</div>
                )}

                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="Link Title"
                    value={demoTitle}
                    onChange={(e) => setDemoTitle(e.target.value)}
                    style={{ flex: 1, padding: "4px 8px", fontSize: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "4px", marginBottom: 0 }}
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    style={{ flex: 1, padding: "4px 8px", fontSize: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "4px", marginBottom: 0 }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "4px", fontSize: "0.75rem", borderRadius: "4px" }}>
                  + Add Link to Preview
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Featured Resources Section */}
        <div style={{ paddingTop: "2rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "4px", height: "24px", backgroundColor: "var(--accent-blue)", borderRadius: "2px" }}></div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: "700" }}>Featured Resources</h2>
            </div>
            <span className="badge badge-blue" style={{ padding: "0.25rem 0.75rem" }}>
              Page {currentSlidePage + 1} of 2
            </span>
          </div>

          <div className="resources-grid">
            {visibleFeaturedResources.map((res) => (
              <div 
                key={res.title} 
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
                  border: "1px solid var(--border-color)",
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <BrandIcon name={res.brand} size={22} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.15rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", cursor: "pointer" }}>
                      {res.title}
                    </h4>
                  </a>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.35rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {res.description}
                  </p>
                  <span className="badge badge-blue" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>
                    {res.category}
                  </span>
                </div>

                <a 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary" 
                  style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", flexShrink: 0, textDecoration: "none" }}
                >
                  Visit
                </a>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.65rem", marginTop: "2rem" }}>
            <button 
              onClick={() => setCurrentSlidePage(0)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: currentSlidePage === 0 ? "var(--accent-blue)" : "var(--border-color)",
                cursor: "pointer",
                padding: 0,
                transition: "background-color 0.2s ease"
              }}
              title="Page 1"
            />
            <button 
              onClick={() => setCurrentSlidePage(1)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: currentSlidePage === 1 ? "var(--accent-blue)" : "var(--border-color)",
                cursor: "pointer",
                padding: 0,
                transition: "background-color 0.2s ease"
              }}
              title="Page 2"
            />
          </div>
        </div>

      </div>

      {/* Auth Modal Trigger helper */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={(userData) => {
          localStorage.setItem("currentUser", JSON.stringify(userData));
          localStorage.setItem("logged_in_user", typeof userData === "object" ? userData.name : userData);
          window.location.reload();
        }}
        initialTab="register"
      />
    </div>
  );
}

export default Home;
