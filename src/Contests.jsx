import ResourceCard from "./ResourceCard";

function Contests() {
  const contestSites = [
    { title: "Devpost", description: "The home for hackathons. Explore, join, and submit projects to global offline and virtual hackathons.", url: "https://devpost.com", type: "Hackathons", cost: "Free" },
    { title: "Major League Hacking (MLH)", description: "The official student hackathon league, coordinating 200+ weekend invention competitions.", url: "https://mlh.io", type: "Hackathons", cost: "Free" },
    { title: "LeetCode Contests", description: "Participate in weekly and bi-weekly algorithmic coding contests with global rating updates.", url: "https://leetcode.com/contest", type: "Coding Contests", cost: "Free" },
    { title: "HackerRank Contests", description: "Take part in corporate hiring hackathons and community competitive coding contests.", url: "https://www.hackerrank.com/contests", type: "Coding Contests", cost: "Free" },
    { title: "Codeforces", description: "Highly popular Russian competitive programming site hosting regular short rounds.", url: "https://codeforces.com", type: "Coding Contests", cost: "Free" },
    { title: "CodeChef", description: "Monthly programming contests (Starters, Cook-Off, Lunchtime) for programmers.", url: "https://www.codechef.com", type: "Coding Contests", cost: "Free" },
    { title: "Kaggle Competitions", description: "Machine learning and deep learning competitions with real-world datasets and major cash prizes.", url: "https://www.kaggle.com/competitions", type: "Data Science", cost: "Free" },
    { title: "AtCoder", description: "High-quality, regular competitive programming contests based in Japan.", url: "https://atcoder.jp", type: "Coding Contests", cost: "Free" },
    { title: "HackerEarth", description: "Developer platform hosting hackathons, coding challenges, and recruitment tests.", url: "https://www.hackerearth.com", type: "Hackathons", cost: "Free" }
  ];

  return (
    <div className="container">
      <h2>Contests & Hackathons</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Join competitive programming contests, algorithm tournaments, and global hackathons to build your portfolio.
      </p>
      <div className="resources-grid">
        {contestSites.map((site) => (
          <ResourceCard key={site.title} {...site} />
        ))}
      </div>
    </div>
  );
}

export default Contests;
