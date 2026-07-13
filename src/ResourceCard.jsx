function ResourceCard({ title, description, url, type, cost }) {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getColor = (name) => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["#1e70e6", "#475569", "#fb923c", "#10b981", "#ec4899", "#f97316", "#06b6d4", "#a855f7"];
    return colors[hash % colors.length];
  };

  const getFullUrl = (urlStr) => {
    if (!urlStr) return "#";
    if (/^https?:\/\//i.test(urlStr)) {
      return urlStr;
    }
    return `https://${urlStr}`;
  };

  const safeUrl = getFullUrl(url);

  return (
    <div className="card-premium" style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "1rem",
      padding: "1rem",
      width: "100%"
    }}>
      {/* Circle Brand avatar placeholder */}
      <div style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: getColor(title),
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        fontWeight: "700",
        flexShrink: 0
      }}>
        {getInitial(title)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <a href={safeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.15rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", cursor: "pointer" }}>
            {title}
          </h4>
        </a>
        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.35rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.3" }}>
          {description}
        </p>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <span className="badge badge-blue" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>
            {type}
          </span>
          <span className="badge" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem", backgroundColor: "#f1f5f9", color: "var(--text-secondary)" }}>
            {cost}
          </span>
        </div>
      </div>

      <a 
        href={safeUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-secondary" 
        style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", flexShrink: 0, textDecoration: "none" }}
      >
        Visit
      </a>
    </div>
  );
}

export default ResourceCard;
