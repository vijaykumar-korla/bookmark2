import { useState } from "react";
import ResourceCard from "./ResourceCard";

function Resources() {
  const [selectedTab, setSelectedTab] = useState("general");

  const database = {
    general: {
      title: "General Learning Resources",
      description: "Core learning databases, digital libraries, and general knowledge sites.",
      sites: [
        { title: "Khan Academy", description: "Learn math, science, and history for free.", url: "https://www.khanacademy.org", type: "Website", cost: "Free" },
        { title: "Wikipedia", description: "The free online encyclopedia.", url: "https://www.wikipedia.org", type: "Website", cost: "Free" },
        { title: "Quizlet", description: "Digital study flashcards and sets.", url: "https://quizlet.com", type: "Website", cost: "Free" },
        { title: "Coursera", description: "Online courses from top universities.", url: "https://www.coursera.org", type: "Website", cost: "Paid" },
        { title: "Udemy", description: "Affordable courses on various topics.", url: "https://www.udemy.com", type: "Website", cost: "Paid" },
        { title: "edX", description: "High-quality university courses online.", url: "https://www.edx.org", type: "Website", cost: "Paid" },
        { title: "Udacity", description: "Nano-degrees and tech credentials.", url: "https://www.udacity.com", type: "Website", cost: "Paid" },
        { title: "Harvard Online", description: "Free courses from Harvard.", url: "https://online-learning.harvard.edu", type: "Website", cost: "Free" },
        { title: "Pluralsight", description: "Professional technology skills platform.", url: "https://www.pluralsight.com", type: "Website", cost: "Paid" },
        { title: "Alison", description: "Free certified courses and workplace skills.", url: "https://alison.com", type: "Website", cost: "Free" },
        { title: "FutureLearn", description: "Online degrees and courses from top institutions.", url: "https://www.futurelearn.com", type: "Website", cost: "Paid" },
        { title: "Skillshare", description: "Creative classes for designers and builders.", url: "https://www.skillshare.com", type: "Website", cost: "Paid" }
      ]
    },
    development: {
      title: "Development & Version Control Tools",
      description: "Version control platforms, database services, hosting, and developer forum communities.",
      sites: [
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
      ]
    },
    videos: {
      title: "Video Tutorials & Lectures",
      description: "Interactive video playlists, lecture series, and structured online video bootcamps.",
      sites: [
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
      ]
    },
    tutorials: {
      title: "Step-by-Step Tutorials",
      description: "Follow along with structured text tutorials, documentations, and language guides.",
      sites: [
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
      ]
    },
    practice: {
      title: "Coding & Challenges Practice",
      description: "Solve daily algorithm puzzles, join competitive leagues, and test coding capabilities.",
      sites: [
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
      ]
    },
    contests: {
      title: "Contests & Hackathons",
      description: "Join competitive programming contests, algorithm tournaments, and global hackathons to build your portfolio.",
      sites: [
        { title: "Devpost", description: "The home for hackathons. Explore, join, and submit projects.", url: "https://devpost.com", type: "Hackathons", cost: "Free" },
        { title: "Major League Hacking (MLH)", description: "The official student hackathon league hosting weekend events.", url: "https://mlh.io", type: "Hackathons", cost: "Free" },
        { title: "LeetCode Contests", description: "Weekly and bi-weekly algorithmic coding contests.", url: "https://leetcode.com/contest", type: "Contests", cost: "Free" },
        { title: "HackerRank Contests", description: "Take part in corporate hiring hackathons and contests.", url: "https://www.hackerrank.com/contests", type: "Contests", cost: "Free" },
        { title: "Codeforces", description: "Competitive programming platform hosting regular short rounds.", url: "https://codeforces.com", type: "Contests", cost: "Free" },
        { title: "CodeChef", description: "Monthly programming contests for developers.", url: "https://www.codechef.com", type: "Contests", cost: "Free" },
        { title: "Kaggle Competitions", description: "Machine learning competitions with real datasets and prizes.", url: "https://www.kaggle.com/competitions", type: "Data Science", cost: "Free" },
        { title: "AtCoder", description: "High-quality competitive programming contests based in Japan.", url: "https://atcoder.jp", type: "Contests", cost: "Free" },
        { title: "HackerEarth", description: "Developer platform hosting hackathons and recruitment tests.", url: "https://www.hackerearth.com", type: "Hackathons", cost: "Free" }
      ]
    },
    tests: {
      title: "Technical Assessment Tests",
      description: "Take practice exams and screening tests to evaluate your technical skills.",
      sites: [
        { title: "HackerEarth Assessment", description: "Take coding tests, hackathons, and technical assessments.", url: "https://www.hackerearth.com", type: "Technical Test", cost: "Free" },
        { title: "Codility", description: "Code screening assessments to test development skills.", url: "https://www.codility.com", type: "Technical Test", cost: "Free" },
        { title: "Devskiller", description: "Coding tests based on real-life tasks and frameworks.", url: "https://devskiller.com", type: "Technical Test", cost: "Free" },
        { title: "CodeSignal", description: "Standardized technical assessment tests.", url: "https://codesignal.com", type: "Technical Test", cost: "Paid" },
        { title: "TestDome", description: "Skill testing certifications for employers and candidates.", url: "https://www.testdome.com", type: "Technical Test", cost: "Paid" },
        { title: "Criteria Corp", description: "Cognitive aptitude and skills screening tests.", url: "https://www.criteriacorp.com", type: "Technical Test", cost: "Paid" }
      ]
    },
    ai: {
      title: "AI Developer Assistant Tools",
      description: "Generative artificial intelligence tools to explain codes, debug bugs, and write components.",
      sites: [
        { title: "ChatGPT", description: "General AI query chatbot assistant.", url: "https://chatgpt.com", type: "AI Tool", cost: "Free" },
        { title: "GitHub Copilot", description: "Autocomplete AI pair programmer for visual studio codes.", url: "https://github.com/features/copilot", type: "AI Tool", cost: "Paid" },
        { title: "Claude AI", description: "Advanced reasoning artificial model for text explanations.", url: "https://claude.ai", type: "AI Tool", cost: "Free" },
        { title: "v0 Vercel", description: "Generates modern React frontend component UI codes.", url: "https://v0.dev", type: "AI Tool", cost: "Free" },
        { title: "Gemini AI", description: "Google's multimodal artificial intelligence model helper.", url: "https://gemini.google.com", type: "AI Tool", cost: "Free" },
        { title: "Cursor AI", description: "AI-first code editor designed for pair programming.", url: "https://www.cursor.com", type: "AI Tool", cost: "Paid" },
        { title: "Phind", description: "Search engine built specifically for software developers.", url: "https://www.phind.com", type: "AI Tool", cost: "Free" },
        { title: "Perplexity AI", description: "Conversational answer engine with accurate references.", url: "https://www.perplexity.ai", type: "AI Tool", cost: "Free" },
        { title: "Ideavize (Huebits)", description: "Generative AI innovation platform that validates project ideas and outputs timelines.", url: "https://ideavize.huebits.in", type: "AI Tool", cost: "Free" },
        { title: "Antigravity (DeepMind)", description: "Google DeepMind's agentic AI coding assistant designed for codebase engineering.", url: "https://deepmind.google", type: "AI Tool", cost: "Free" },
        { title: "Kimi AI (Moonshot)", description: "AI assistant specialized in processing long-context documents and repositories.", url: "https://kimi.moonshot.cn", type: "AI Tool", cost: "Free" }
      ]
    },
    mentors: {
      title: "AI Project Mentors & Guiders",
      description: "Generative AI sandbox assistants, full-stack builders, and autonomous engineering mentors to guide you from idea to deployment.",
      sites: [
        { title: "Ideavize (Huebits)", description: "Generative AI innovation platform that validates project ideas and instantly outputs implementation roadmaps.", url: "https://ideavize.huebits.in", type: "AI Mentor", cost: "Free" },
        { title: "Bolt.new (StackBlitz)", description: "AI-powered web sandbox that lets you build, run, and deploy full-stack React and Node applications from prompts.", url: "https://bolt.new", type: "AI Mentor", cost: "Free" },
        { title: "Lovable.dev", description: "An AI-powered full-stack developer assistant that codes and deploys functional web apps, guiding you step-by-step.", url: "https://lovable.dev", type: "AI Mentor", cost: "Paid" },
        { title: "Replit Agent", description: "Autonomous agent that plans code, provisions databases, installs system dependencies, and deploys full web projects.", url: "https://replit.com/features/agent", type: "AI Mentor", cost: "Paid" },
        { title: "Devin AI (Cognition)", description: "The world's first AI software engineer teammate that can build software, debug repos, and deploy projects autonomously.", url: "https://www.cognition.ai", type: "AI Mentor", cost: "Paid" },
        { title: "GPT Engineer", description: "AI coding tool that scaffolds entire codebases from text instructions and guides you through setting up and running repositories.", url: "https://gptengineer.app", type: "AI Mentor", cost: "Free" },
        { title: "Cursor Composer", description: "Multi-file AI editor that coordinates code changes across multiple files concurrently, acting as a live co-pilot.", url: "https://www.cursor.com", type: "AI Mentor", cost: "Paid" },
        { title: "v0 Vercel", description: "Generative UI system that designs, builds, and styles frontends using React and Tailwind CSS.", url: "https://v0.dev", type: "AI Mentor", cost: "Free" }
      ]
    },
    books: {
      title: "E-Books & Textbook Libraries",
      description: "Find free classic digital libraries, technology manuals, and PDF textbook files.",
      sites: [
        { title: "Internet Archive", description: "Free online digital database of books and libraries.", url: "https://archive.org", type: "E-Books", cost: "Free" },
        { title: "Project Gutenberg", description: "Library of classic free public-domain books.", url: "https://www.gutenberg.org", type: "E-Books", cost: "Free" },
        { title: "O'Reilly Media", description: "Premium textbook manuals on programming languages.", url: "https://www.oreilly.com", type: "E-Books", cost: "Paid" },
        { title: "PDF Drive", description: "Large text search engine portal for downloading PDF manuals.", url: "https://www.pdfdrive.com", type: "E-Books", cost: "Free" },
        { title: "Packt Library", description: "Online tech books and developer training material.", url: "https://www.packtpub.com", type: "E-Books", cost: "Paid" },
        { title: "Open Library", description: "Open editable library catalog pointing to millions of books.", url: "https://openlibrary.org", type: "E-Books", cost: "Free" }
      ]
    }
  };

  const currentTab = database[selectedTab];

  return (
    <div className="container">
      <div className="internal-layout">
        
        {/* Left Sidebar Navigation */}
        <aside className="internal-sidenav">
          <div className="sidenav-group-label">Core Directory</div>
          <button 
            onClick={() => setSelectedTab("general")} 
            className={`internal-sidenav-btn ${selectedTab === "general" ? "active" : ""}`}
          >
            General Resources
          </button>
          <button 
            onClick={() => setSelectedTab("development")} 
            className={`internal-sidenav-btn ${selectedTab === "development" ? "active" : ""}`}
          >
            Development Tools
          </button>
          <button 
            onClick={() => setSelectedTab("videos")} 
            className={`internal-sidenav-btn ${selectedTab === "videos" ? "active" : ""}`}
          >
            Video Tutorials
          </button>
          <button 
            onClick={() => setSelectedTab("tutorials")} 
            className={`internal-sidenav-btn ${selectedTab === "tutorials" ? "active" : ""}`}
          >
            Step Tutorials
          </button>
          
          <div className="sidenav-group-label" style={{ marginTop: "1rem" }}>Training</div>
          <button 
            onClick={() => setSelectedTab("practice")} 
            className={`internal-sidenav-btn ${selectedTab === "practice" ? "active" : ""}`}
          >
            Coding Practice
          </button>
          <button 
            onClick={() => setSelectedTab("contests")} 
            className={`internal-sidenav-btn ${selectedTab === "contests" ? "active" : ""}`}
          >
            Contests & Hackathons
          </button>
          <button 
            onClick={() => setSelectedTab("tests")} 
            className={`internal-sidenav-btn ${selectedTab === "tests" ? "active" : ""}`}
          >
            Skill Tests
          </button>
          
          <div className="sidenav-group-label" style={{ marginTop: "1rem" }}>Developer Kits</div>
          <button 
            onClick={() => setSelectedTab("ai")} 
            className={`internal-sidenav-btn ${selectedTab === "ai" ? "active" : ""}`}
          >
            AI Coding Tools
          </button>
          <button 
            onClick={() => setSelectedTab("mentors")} 
            className={`internal-sidenav-btn ${selectedTab === "mentors" ? "active" : ""}`}
          >
            AI Project Mentors
          </button>
          <button 
            onClick={() => setSelectedTab("books")} 
            className={`internal-sidenav-btn ${selectedTab === "books" ? "active" : ""}`}
          >
            E-Books & Docs
          </button>
        </aside>

        {/* Right Active Content Directory */}
        <main style={{ minWidth: 0 }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.25rem" }}>{currentTab.title}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
            {currentTab.description}
          </p>

          <div className="resources-grid">
            {currentTab.sites.map((site) => (
              <ResourceCard key={site.title} {...site} />
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}

export default Resources;
