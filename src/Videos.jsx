import ResourceCard from "./ResourceCard";

function Videos() {
  const videoSites = [
    { title: "Coursera", description: "University-grade video lecture courses and certifications.", url: "https://www.coursera.org", type: "Courses", cost: "Paid" },
    { title: "Udemy", description: "Affordable structured video tutorial courses from industry experts.", url: "https://www.udemy.com", type: "Courses", cost: "Paid" },
    { title: "YouTube Education", description: "Free online educational channels.", url: "https://www.youtube.com", type: "Video", cost: "Free" },
    { title: "TED-Ed", description: "Short animated educational videos.", url: "https://ed.ted.com", type: "Video", cost: "Free" },
    { title: "MIT OpenCourseWare YouTube", description: "Recorded lectures from MIT college courses.", url: "https://www.youtube.com/user/mit", type: "Video", cost: "Free" },
    { title: "freeCodeCamp YouTube", description: "Full-length 10+ hour programming courses.", url: "https://www.youtube.com/c/freecodecamp", type: "Video", cost: "Free" },
    { title: "CrashCourse", description: "Educational science and history series.", url: "https://www.youtube.com/user/crashcourse", type: "Video", cost: "Free" },
    { title: "Traversy Media", description: "Practical web development crash courses.", url: "https://www.youtube.com/user/techguyweb", type: "Video", cost: "Free" },
    { title: "The Net Ninja", description: "Structured frontend tutorial playlists.", url: "https://www.youtube.com/c/thenetninja", type: "Video", cost: "Free" },
    { title: "CS50 YouTube", description: "Harvard computer science lecture series.", url: "https://www.youtube.com/c/cs50", type: "Video", cost: "Free" },
    { title: "Fireship", description: "High-speed coding tutorials and tech news.", url: "https://www.youtube.com/@Fireship", type: "Video", cost: "Free" },
    { title: "Web Dev Simplified", description: "Clear explanations of complex web concepts.", url: "https://www.youtube.com/@WebDevSimplified", type: "Video", cost: "Free" },
    { title: "Programming with Mosh", description: "Detailed beginner-friendly coding bootcamps.", url: "https://www.youtube.com/@programmingwithmosh", type: "Video", cost: "Free" },
    { title: "Academind", description: "In-depth web development tutorials.", url: "https://www.youtube.com/@Academind", type: "Video", cost: "Free" }
  ];

  return (
    <div className="container">
      <h2>Educational Videos</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Interactive video playlists, lecture series, and structured online video bootcamps.
      </p>
      <div className="resources-grid">
        {videoSites.map((site) => (
          <ResourceCard key={site.title} {...site} />
        ))}
      </div>
    </div>
  );
}

export default Videos;
