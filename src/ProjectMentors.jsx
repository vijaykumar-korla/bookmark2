import ResourceCard from "./ResourceCard";

function ProjectMentors() {
  const mentorTools = [
    { 
      title: "Ideavize (Huebits)", 
      description: "Generative AI innovation platform that validates project ideas and instantly outputs implementation roadmaps, tech stacks, and step-by-step milestones.", 
      url: "https://ideavize.huebits.in", 
      type: "AI Project Mentor", 
      cost: "Free" 
    },
    { 
      title: "Bolt.new (StackBlitz)", 
      description: "AI-powered web sandbox that lets you build, run, and deploy full-stack React and Node applications directly in your browser using natural language prompts.", 
      url: "https://bolt.new", 
      type: "AI Full-Stack Builder", 
      cost: "Free" 
    },
    { 
      title: "Lovable.dev", 
      description: "An AI-powered full-stack developer assistant that codes and deploys functional web apps, guiding you step-by-step through iteration and bug fixing.", 
      url: "https://lovable.dev", 
      type: "AI Project Guider", 
      cost: "Paid" 
    },
    { 
      title: "Replit Agent", 
      description: "Autonomous agent that plans code, provisions databases, installs system dependencies, and deploys full web projects via conversational instruction.", 
      url: "https://replit.com/features/agent", 
      type: "AI Project Mentor", 
      cost: "Paid" 
    },
    { 
      title: "Devin AI (Cognition)", 
      description: "The world's first AI software engineer teammate that can build software, debug repos, and deploy projects autonomously with detailed step guides.", 
      url: "https://www.cognition.ai", 
      type: "Autonomous AI Dev", 
      cost: "Paid" 
    },
    { 
      title: "GPT Engineer", 
      description: "AI coding tool that scaffolds entire codebases from text instructions and guides you through setting up and running your repositories.", 
      url: "https://gptengineer.app", 
      type: "AI Code Mentor", 
      cost: "Free" 
    },
    { 
      title: "Cursor Composer", 
      description: "Multi-file AI editor that coordinates code changes across multiple files concurrently, acting as a live co-pilot for architectural builds.", 
      url: "https://www.cursor.com", 
      type: "AI Code Guider", 
      cost: "Paid" 
    },
    { 
      title: "v0 Vercel", 
      description: "Generative UI system that designs, builds, and styles frontends using React and Tailwind CSS, mentoring developers on layout architecture.", 
      url: "https://v0.dev", 
      type: "AI UI Mentor", 
      cost: "Free" 
    }
  ];

  return (
    <div className="container">
      <h2>AI Project Mentors & Guiders</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Generative AI sandbox assistants, full-stack builders, and autonomous engineering mentors to guide you from idea to deployment.
      </p>
      <div className="resources-grid">
        {mentorTools.map((tool) => (
          <ResourceCard key={tool.title} {...tool} />
        ))}
      </div>
    </div>
  );
}

export default ProjectMentors;
