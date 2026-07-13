import ResourceCard from "./ResourceCard";

function Development() {
  const developmentSites = [
    { title: "GitHub", description: "Build and ship software together using Git repositories.", url: "https://github.com", type: "Development", cost: "Free" },
    { title: "Stack Overflow", description: "Q&A community forum for software developer coding questions.", url: "https://stackoverflow.com", type: "Development", cost: "Free" },
    { title: "MDN Web Docs", description: "Official Mozilla documentation for HTML, CSS, and JavaScript standards.", url: "https://developer.mozilla.org", type: "Development", cost: "Free" },
    { title: "MongoDB Atlas", description: "Cloud-hosted developer database service for modern apps.", url: "https://www.mongodb.com/cloud/atlas", type: "Development", cost: "Free" },
    { title: "Git", description: "Free open-source distributed version control system.", url: "https://git-scm.com", type: "Development", cost: "Free" },
    { title: "npm", description: "Software package registry manager for JavaScript and Node.", url: "https://www.npmjs.com", type: "Development", cost: "Free" },
    { title: "Vercel", description: "Hosting platform for frontend frameworks and static websites.", url: "https://vercel.com", type: "Development", cost: "Free" },
    { title: "Netlify", description: "Build, deploy, and scale web applications instantly.", url: "https://www.netlify.com", type: "Development", cost: "Free" },
    { title: "CodePen", description: "Social development environment for testing frontend code snippets.", url: "https://codepen.io", type: "Development", cost: "Free" },
    { title: "Docker", description: "Containerization platform to build, share, and run apps anywhere.", url: "https://www.docker.com", type: "Development", cost: "Free" }
  ];

  return (
    <div className="container">
      <h2>Development & Tools</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Version control platforms, database services, hostings, and developer forums.
      </p>
      <div className="resources-grid">
        {developmentSites.map((site) => (
          <ResourceCard key={site.title} {...site} />
        ))}
      </div>
    </div>
  );
}

export default Development;
