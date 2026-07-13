import ResourceCard from "./ResourceCard";

function Practice() {
  const practiceSites = [
    { title: "LeetCode", description: "Practice algorithmic challenges.", url: "https://leetcode.com", type: "Practice", cost: "Free" },
    { title: "HackerRank", description: "Assess skills with coding quizzes.", url: "https://www.hackerrank.com", type: "Practice", cost: "Free" },
    { title: "CodeChef", description: "Participate in competitive challenges.", url: "https://www.codechef.com", type: "Practice", cost: "Free" },
    { title: "LinkedIn", description: "Professional networking platform.", url: "https://www.linkedin.com", type: "Professional", cost: "Free" },
    { title: "Codeforces", description: "High-frequency competitive programming contests.", url: "https://codeforces.com", type: "Practice", cost: "Free" },
    { title: "AtCoder", description: "Japanese competitive programming platform.", url: "https://atcoder.jp", type: "Practice", cost: "Free" },
    { title: "Codewars", description: "Train on algorithm challenges with other coders.", url: "https://www.codewars.com", type: "Practice", cost: "Free" },
    { title: "Exercism", description: "Code practice with human mentoring feedback.", url: "https://exercism.org", type: "Practice", cost: "Free" },
    { title: "Project Euler", description: "Mathematical and coding puzzles.", url: "https://projecteuler.net", type: "Practice", cost: "Free" },
    { title: "Edabit", description: "Learn coding with interactive, bite-sized challenges.", url: "https://edabit.com", type: "Practice", cost: "Paid" },
    { title: "Coderbyte", description: "Coding challenges and interview preparation prep.", url: "https://coderbyte.com", type: "Practice", cost: "Paid" },
    { title: "Kaggle", description: "Data science and machine learning practice challenges.", url: "https://www.kaggle.com", type: "Practice", cost: "Free" }
  ];

  return (
    <div className="container">
      <h2>Coding Practice</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Solve daily algorithm puzzles, join competitive leagues, and test coding capabilities.
      </p>
      <div className="resources-grid">
        {practiceSites.map((site) => (
          <ResourceCard key={site.title} {...site} />
        ))}
      </div>
    </div>
  );
}

export default Practice;
