import ResourceCard from "./ResourceCard";

function MernStack() {
  const mernSteps = [
    {
      title: "🍃 Stage 1: MongoDB Database",
      target: "Data Modeling & Schemas",
      description: "Define collections, schemas, validations, and connect to a cloud MongoDB Atlas instance.",
      sites: [
        { title: "MongoDB Atlas", description: "Fully-managed cloud database for modern application schemas.", url: "https://www.mongodb.com/cloud/atlas", type: "Database", cost: "Free" },
        { title: "Mongoose ORM Docs", description: "Official documentation for JavaScript object modeling for MongoDB.", url: "https://mongoosejs.com", type: "Docs", cost: "Free" },
        { title: "MongoDB University", description: "Free online courses directly from MongoDB engineers.", url: "https://learn.mongodb.com", type: "Courses", cost: "Free" }
      ]
    },
    {
      title: "🚂 Stage 2: Express.js Backend",
      target: "HTTP API Servers & Routes",
      description: "Build robust REST APIs, design Express routers, and implement CORS and auth middlewares.",
      sites: [
        { title: "Express.js Reference", description: "Fast, unopinionated, minimalist web framework for Node.js.", url: "https://expressjs.com", type: "Docs", cost: "Free" },
        { title: "JSON Web Tokens (JWT)", description: "Learn token-based session auth standards for API routes.", url: "https://jwt.io", type: "Auth", cost: "Free" },
        { title: "Postman API Client", description: "Platform to design, test, mock, and document REST APIs.", url: "https://www.postman.com", type: "Developer Tool", cost: "Free" }
      ]
    },
    {
      title: "⚛️ Stage 3: React.js Frontend",
      target: "Interactive User Interfaces",
      description: "Scaffold client apps with Vite, construct components, manage states, and declare router paths.",
      sites: [
        { title: "React Official Docs", description: "The reference handbook for the modern functional React library.", url: "https://react.dev", type: "Docs", cost: "Free" },
        { title: "React Router", description: "Declarative dynamic routing libraries for React applications.", url: "https://reactrouter.com", type: "Router Library", cost: "Free" },
        { title: "Vite Bundler Tool", description: "Next-generation frontend tool that compiles and hot-reloads UI assets.", url: "https://vite.dev", type: "Build Tool", cost: "Free" }
      ]
    },
    {
      title: "🟢 Stage 4: Node.js Integration",
      target: "Server-Side Javascript Engine",
      description: "Manage package manager dependencies, write async operations, and connect backend to database.",
      sites: [
        { title: "Node.js documentation", description: "Command-line Javascript runtime environment docs.", url: "https://nodejs.org", type: "Docs", cost: "Free" },
        { title: "npm package registry", description: "Web database directory of open-source Node packages.", url: "https://www.npmjs.com", type: "Packages", cost: "Free" },
        { title: "pm2 Process Manager", description: "Production runtime process manager for Node.js servers.", url: "https://pm2.keymetrics.io", type: "Devops Tool", cost: "Free" }
      ]
    }
  ];

  return (
    <div className="container">
      <h2>MERN Stack Full-Stack Roadmap</h2>
      <p style={{ margin: "0.5rem 0 2.5rem 0", color: "var(--text-secondary)" }}>
        A complete guide to building end-to-end Javascript applications. Follow the timeline stages and use the curated resource links for each section.
      </p>

      {/* Visual Timeline Layout */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", position: "relative" }}>
        
        {/* Timeline Center Line */}
        <div style={{
          position: "absolute",
          top: "10px",
          bottom: "10px",
          left: "20px",
          width: "2px",
          backgroundColor: "var(--accent-blue)",
          opacity: 0.3,
          zIndex: 0
        }}></div>

        {mernSteps.map((step, idx) => (
          <div 
            key={step.title}
            style={{
              display: "flex",
              gap: "1.5rem",
              position: "relative",
              zIndex: 1
            }}
          >
            {/* Timeline Circle Node */}
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-blue)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "1.15rem",
              flexShrink: 0,
              boxShadow: "0 0 0 6px #ffffff"
            }}>
              {idx + 1}
            </div>

            {/* Stage Card Content */}
            <div style={{ flex: 1 }}>
              <div className="card-premium" style={{ padding: "1.5rem 2rem", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.25rem", color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <div style={{ fontSize: "0.825rem", color: "var(--accent-blue)", fontWeight: "600", marginBottom: "0.75rem" }}>
                  Target Focus: {step.target}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5", margin: 0 }}>
                  {step.description}
                </p>
              </div>

              {/* Resource Links under each stage */}
              <div style={{ paddingLeft: "1rem" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--text-secondary)" }}>
                  Suggested Learning References:
                </h4>
                <div className="resources-grid">
                  {step.sites.map((site) => (
                    <ResourceCard key={site.title} {...site} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MernStack;
