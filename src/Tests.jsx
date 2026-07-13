import ResourceCard from "./ResourceCard";

function Tests() {
  const testSites = [
    {
      title: "HackerEarth Assessment",
      description: "Take coding tests, hackathons, and technical assessments.",
      url: "https://www.hackerearth.com",
      type: "Technical Test",
      cost: "Free"
    },
    {
      title: "Codility",
      description: "Code screening assessments to test development skills.",
      url: "https://www.codility.com",
      type: "Technical Test",
      cost: "Free"
    },
    {
      title: "Devskiller",
      description: "Coding tests based on real-life tasks and frameworks.",
      url: "https://devskiller.com",
      type: "Technical Test",
      cost: "Free"
    },
    {
      title: "CodeSignal",
      description: "Standardized technical assessment tests.",
      url: "https://codesignal.com",
      type: "Technical Test",
      cost: "Paid"
    },
    {
      title: "TestDome",
      description: "Skill testing certifications for employers and candidates.",
      url: "https://www.testdome.com",
      type: "Technical Test",
      cost: "Paid"
    },
    {
      title: "Criteria Corp",
      description: "Cognitive aptitude and skills screening tests.",
      url: "https://www.criteriacorp.com",
      type: "Technical Test",
      cost: "Paid"
    }
  ];

  return (
    <div className="container">
      <h2>Technical Skill Tests</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Take practice exams and screening tests to evaluate your technical skills.
      </p>
      <div className="resources-grid">
        {testSites.map((site) => (
          <ResourceCard key={site.title} {...site} />
        ))}
      </div>
    </div>
  );
}

export default Tests;
