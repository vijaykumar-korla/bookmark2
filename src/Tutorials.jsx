import ResourceCard from "./ResourceCard";

function Tutorials() {
  const tutorialSites = [
    { title: "W3Schools", description: "Web development tutorial references.", url: "https://www.w3schools.com", type: "Tutorial", cost: "Free" },
    { title: "GeeksforGeeks", description: "Computer science articles and guides.", url: "https://www.geeksforgeeks.org", type: "Tutorial", cost: "Free" },
    { title: "JavaTpoint", description: "Easy-to-follow tutorials on major languages.", url: "https://www.javatpoint.com", type: "Tutorial", cost: "Free" },
    { title: "TutorialsPoint", description: "Library of technical reference tutorials.", url: "https://www.tutorialspoint.com", type: "Tutorial", cost: "Free" },
    { title: "MDN Web Docs", description: "Official web standards documentation.", url: "https://developer.mozilla.org", type: "Tutorial", cost: "Free" },
    { title: "JavaScript.info", description: "Comprehensive modern JavaScript tutorials.", url: "https://javascript.info", type: "Tutorial", cost: "Free" },
    { title: "LearnCpp", description: "Free guides to learn C++ programming.", url: "https://www.learncpp.com", type: "Tutorial", cost: "Free" },
    { title: "Git Book", description: "Official reference guide for Git.", url: "https://git-scm.com/book", type: "Tutorial", cost: "Free" },
    { title: "CSS-Tricks", description: "Detailed articles about HTML and CSS styling.", url: "https://css-tricks.com", type: "Tutorial", cost: "Free" },
    { title: "Dev.to", description: "Community-driven software developer blog posts.", url: "https://dev.to", type: "Tutorial", cost: "Free" },
    { title: "Smashing Magazine", description: "Editorial articles for web designers and developers.", url: "https://www.smashingmagazine.com", type: "Tutorial", cost: "Free" },
    { title: "Scrimba", description: "Interactive code-along tutorial courses.", url: "https://scrimba.com", type: "Tutorial", cost: "Paid" }
  ];

  return (
    <div className="container">
      <h2>Tutorials Guide</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Follow along with structured text tutorials, documentations, and language guides.
      </p>
      <div className="resources-grid">
        {tutorialSites.map((site) => (
          <ResourceCard key={site.title} {...site} />
        ))}
      </div>
    </div>
  );
}

export default Tutorials;
