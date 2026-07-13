import ResourceCard from "./ResourceCard";

function AiTools() {
  const aiToolsList = [
    {
      title: "ChatGPT (OpenAI)",
      description: "OpenAI's chatbot model, incredibly useful for beginners to get code explanations, debug script errors, and learn concepts.",
      url: "https://chatgpt.com",
      type: "AI Chatbot Helper",
      cost: "Free"
    },
    {
      title: "Claude (Anthropic)",
      description: "Anthropic's state-of-the-art model. Excellent for step-by-step programming lessons, code reviews, and visual walkthroughs.",
      url: "https://claude.ai",
      type: "AI Assistant",
      cost: "Free"
    },
    {
      title: "Gemini (Google)",
      description: "Google's multimodal assistant, integrated into developer workspaces for code generation and explaining syntax.",
      url: "https://gemini.google.com",
      type: "AI Coding Assistant",
      cost: "Free"
    },
    {
      title: "Phind AI Search",
      description: "An AI search engine built for developers. Ask coding questions and get direct answers with tutorial links, perfect for beginners.",
      url: "https://www.phind.com",
      type: "AI Search Engine",
      cost: "Free"
    },
    {
      title: "CodePal",
      description: "AI-powered tool that generates, tests, and explains code in 30+ languages. Invaluable for beginners learning new syntax.",
      url: "https://codepal.ai",
      type: "AI Code Generator",
      cost: "Free"
    },
    {
      title: "v0 Vercel",
      description: "Generates beautiful React and HTML frontend UI interfaces from simple text prompts. Great for visual learners.",
      url: "https://v0.dev",
      type: "AI UI Builder",
      cost: "Free"
    },
    {
      title: "Blackbox AI",
      description: "High-speed AI assistant that autocompletes code and finds coding answers inside web search logs.",
      url: "https://www.blackbox.ai",
      type: "AI Code Autocomplete",
      cost: "Free"
    },
    {
      title: "Tabnine",
      description: "Local, secure AI autocomplete assistant that runs inside VS Code. Helps beginners type syntax faster and with fewer typos.",
      url: "https://www.tabnine.com",
      type: "AI Code Autocomplete",
      cost: "Free"
    },
    {
      title: "Ideavize (Huebits)",
      description: "Generative AI innovation platform that validates project ideas and instantly outputs implementation roadmaps, tech stacks, and timelines.",
      url: "https://ideavize.huebits.in",
      type: "AI Roadmapping Tool",
      cost: "Free"
    },
    {
      title: "Antigravity (DeepMind)",
      description: "Google DeepMind's agentic AI coding assistant designed for pair programming, full-stack development, and codebase engineering.",
      url: "https://deepmind.google",
      type: "AI Coding Assistant",
      cost: "Free"
    },
    {
      title: "Kimi AI (Moonshot)",
      description: "AI assistant specialized in processing long-context documents, PDFs, and code repositories with exceptional reasoning.",
      url: "https://kimi.moonshot.cn",
      type: "AI Assistant",
      cost: "Free"
    }
  ];

  return (
    <div className="container">
      <h2>AI Coding Tools</h2>
      <p style={{ margin: "0.5rem 0 1.5rem 0", color: "var(--text-secondary)" }}>
        Explore state-of-the-art AI code editors, autocomplete assistants, and application builders.
      </p>
      
      <div className="resources-grid">
        {aiToolsList.map((tool) => (
          <ResourceCard key={tool.title} {...tool} />
        ))}
      </div>
    </div>
  );
}

export default AiTools;
