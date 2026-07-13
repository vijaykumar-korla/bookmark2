function Courses() {
  const roadmaps = [
    {
      title: "HTML & CSS Roadmap",
      target: "Learn Web Layouts",
      steps: [
        { stage: "1. Semantic HTML", details: "Learn tags like headings, paragraphs, lists, forms, and tables." },
        { stage: "2. CSS Fundamentals", details: "Learn colors, fonts, margins, paddings, and the box model." },
        { stage: "3. Layout Systems", details: "Learn Flexbox and CSS Grid for positioning elements." },
        { stage: "4. Responsive Design", details: "Use Media Queries to make layouts work on mobile screens." }
      ]
    },
    {
      title: "JavaScript Roadmap",
      target: "Learn Web Logic",
      steps: [
        { stage: "1. Basic Syntax", details: "Learn variables, loops, arrays, objects, and conditional statements." },
        { stage: "2. Functions & Scope", details: "Understand parameters, arrow functions, and global/local scopes." },
        { stage: "3. DOM Manipulation", details: "Learn to select elements, listen to click events, and update text." },
        { stage: "4. Asynchronous JS", details: "Learn Promises, async/await, and fetching data from API URLs." }
      ]
    },
    {
      title: "React Roadmap",
      target: "Learn UI Frameworks",
      steps: [
        { stage: "1. Components & Props", details: "Learn functional components and passing properties." },
        { stage: "2. React State Hooks", details: "Learn useState for inputs and useEffect for loading data." },
        { stage: "3. Routing Modules", details: "Use React Router (Routes, Route, Link) to navigate between pages." },
        { stage: "4. State Sharing", details: "Pass data up to parent states or use Context hooks for globals." }
      ]
    },
    {
      title: "Python Programming Roadmap",
      target: "Learn Scripting & Data Logic",
      steps: [
        { stage: "1. Python Basics", details: "Understand variable declarations, lists, tuples, dictionaries, and loops." },
        { stage: "2. Functions & Modules", details: "Learn keyword arguments, lambda functions, and importing external libraries." },
        { stage: "3. Object-Oriented Python", details: "Learn classes, constructor methods (__init__), inheritance, and polymorphism." },
        { stage: "4. Data Libraries", details: "Read/write files, parse JSON objects, and practice basics of Pandas & NumPy." }
      ]
    },
    {
      title: "Node.js & Express Roadmap",
      target: "Learn Backend Engineering",
      steps: [
        { stage: "1. Node.js Basics", details: "Learn CommonJS vs ES Modules, event loops, and the built-in filesystem API (fs)." },
        { stage: "2. Express Servers", details: "Configure listener ports, construct request routers, and handle response headers." },
        { stage: "3. Middleware Pipeline", details: "Use cors, body-parser, morgan, and design custom authorization middleware." },
        { stage: "4. REST API CRUD", details: "Build HTTP endpoints, manage query parameters, and parse request body bodies." }
      ]
    },
    {
      title: "MongoDB & Databases Roadmap",
      target: "Learn Database Schemas & Queries",
      steps: [
        { stage: "1. NoSQL Architecture", description: "Understand Document modeling databases, collections, and BSON format.", details: "Understand document databases, collections, and BSON formats." },
        { stage: "2. CRUD commands", details: "Insert documents, find queries with operators ($gte, $or), and update/delete records." },
        { stage: "3. Mongoose ORM Model", details: "Define data schemas, add schema constraints, and execute queries in JavaScript." },
        { stage: "4. Schema Relationships", details: "Refer user profiles in bookmark documents using userId references." }
      ]
    },
    {
      title: "Java Developer Roadmap",
      target: "Learn Enterprise Software Logic",
      steps: [
        { stage: "1. Core Foundations", details: "Declare variables, loops, conditional flow, and manipulate Strings." },
        { stage: "2. Object-Oriented Java", details: "Learn classes, abstract class patterns, interfaces, and visibility keywords." },
        { stage: "3. Collections Framework", details: "Use Lists, Sets, HashMaps, Stream APIs, and implement lambda functions." },
        { stage: "4. Spring Boot Framework", details: "Configure web controllers, dependency injection, and JPA SQL databases." }
      ]
    },
    {
      title: "Next.js Fullstack Roadmap",
      target: "Learn Server-Side Production Apps",
      steps: [
        { stage: "1. App Router Navigation", details: "Define layout files, page paths, dynamic folder routes, and navigation Links." },
        { stage: "2. Data Rendering", details: "Differentiate between Client Components and Server Components." },
        { stage: "3. API Routes Handlers", details: "Configure API route files to process backend requests under app/api." },
        { stage: "4. Server Actions", details: "Execute server-side database insertions directly from frontend forms." }
      ]
    },
    {
      title: "AI & Machine Learning Roadmap",
      target: "Learn Predictive Models & Neural Nets",
      steps: [
        { stage: "1. Math & Data Prep", details: "Learn Linear Algebra, Probability, Calculus, and feature scaling with Scikit-Learn." },
        { stage: "2. Supervised Learning", details: "Master Linear Regression, Decision Trees, Support Vector Machines (SVM), and Logistic classifications." },
        { stage: "3. Unsupervised Learning", details: "Implement K-Means clustering algorithms, Principal Component Analysis (PCA) reductions, and anomalies detection." },
        { stage: "4. Deep Learning & NLP", details: "Construct Multi-layer Neural Networks using PyTorch/TensorFlow, and practice Transformer models fine-tuning." }
      ]
    },
    {
      title: "Quantum Computing Roadmap",
      target: "Learn Quantum Circuits & Algorithms",
      steps: [
        { stage: "1. Qubits & Superposition", details: "Learn quantum states, Dirac notation (bra-ket), superposition states, and Bloch sphere representation." },
        { stage: "2. Quantum Logic Gates", details: "Understand Pauli-X/Y/Z operators, Hadamard (H) gate, CNOT, Phase shift, and T-gates." },
        { stage: "3. Circuit Entanglement", details: "Construct quantum circuits, verify Bell states, and check multi-qubit entanglement." },
        { stage: "4. Quantum Algorithms", details: "Study Deutsch-Jozsa, Grover's search algorithm, Shor's factoring protocol, and program in IBM's Qiskit." }
      ]
    },
    {
      title: "Cybersecurity & Ethical Hacking",
      target: "Learn System Defense & Pen Testing",
      steps: [
        { stage: "1. Network Protocols", details: "Understand TCP/IP subnetting, DNS configurations, routing packets, and analysis via Wireshark." },
        { stage: "2. Linux & Shell Scripting", details: "Master Linux terminal navigation, bash scripts writing, permissions configuration, and privilege escalation." },
        { stage: "3. Vulnerability Auditing", details: "Inspect for OWASP Top 10 vulnerabilities (SQL Injection, XSS, CSRF) using interception proxies like Burp Suite." },
        { stage: "4. Penetration Testing", details: "Conduct network sweeps with Nmap, run Metasploit payload exploits, and draft remediation security reports." }
      ]
    },
    {
      title: "MERN Stack Full-Stack Roadmap",
      target: "Build End-to-End Javascript Web Apps",
      steps: [
        { stage: "1. React Frontend UI", details: "Create responsive pages in React, manage forms with state hooks, and style with premium CSS components." },
        { stage: "2. Node.js & Express REST API", details: "Scaffold Express routers, setup body-parsers, configure listener ports, and write CRUD controller handlers." },
        { stage: "3. MongoDB Document Schemas", details: "Connect Node to MongoDB via Mongoose, define model schemas, enforce data validations, and link collections." },
        { stage: "4. Full-Stack Bridge Integration", details: "Enable CORS sharing, utilize fetch drivers, establish session tokens or header authentication, and deploy both layers." }
      ]
    }
  ];

  return (
    <div className="container">
      <h2>Technology Learning Paths</h2>
      <p style={{ margin: "0.5rem 0 2rem 0", color: "var(--text-secondary)" }}>
        Follow these roadmap structures to know exactly what to learn for each technology.
      </p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {roadmaps.map((path) => (
          <div 
            key={path.title} 
            className="card-premium"
            style={{ 
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <h3 style={{ marginBottom: "0.25rem", fontSize: "1.1rem" }}>{path.title}</h3>
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600", marginBottom: "1.25rem" }}>
              Target: <span style={{ color: "var(--accent-blue-text)" }}>{path.target}</span>
            </div>
            
            <div style={{ paddingLeft: "0.75rem", borderLeft: "2px solid var(--accent-blue)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {path.steps.map((step) => (
                <div key={step.stage}>
                  <strong style={{ fontSize: "0.85rem", display: "block", color: "var(--text-primary)" }}>{step.stage}</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{step.details}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
