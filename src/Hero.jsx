import { Link } from "react-router-dom";
import "./Hero.css";

function Hero({ currentUser }) {
  return (
    <div className="hero-container">
      <section className="hero-content">
        <div className="hero-badge">Student Study Desk 📖</div>
        <h1 className="hero-title">
          Keep Your Course Links & Lectures Organized
        </h1>
        <p className="hero-subtitle">
          Save your homework worksheets, textbook PDFs, reference materials, and video lectures 
          in one simple place. Organise by subject and find links instantly.
        </p>
        
        <div className="hero-buttons">
          <Link 
            to={currentUser ? "/bookmark" : "/register"} 
            className="btn btn-primary btn-lg"
          >
            {currentUser ? "Go to Study Desk" : "Sign Up - It's Free"}
          </Link>
          <Link to="/resources" className="btn btn-secondary btn-lg">
            Explore Study Guides
          </Link>
        </div>
      </section>

      {/* Simple Academic Features */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h4>Textbook References</h4>
          <p>Keep track of syllabus chapters and reference book PDFs.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📹</div>
          <h4>Lecture Playlists</h4>
          <p>Organize crash courses, Youtube lectures, and class recordings.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h4>Homework Links</h4>
          <p>Access online worksheets, lab submissions, and quiz pages.</p>
        </div>
      </section>
    </div>
  );
}

export default Hero;
