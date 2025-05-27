import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Tech stack logos
import reactLogo from '../../assets/logos/react.svg';
import typescriptLogo from '../../assets/logos/typescript.svg';
import fastApiLogo from '../../assets/logos/fastapi.svg';
import postgresLogo from '../../assets/logos/postgres.svg';
import openaiLogo from '../../assets/logos/openai.svg';
import pythonLogo from '../../assets/logos/python.svg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="brand-header">
          <h1 className="brand-name">trakit.la</h1>
        </div>
        <div className="hero-section">
          <div className="hero-text">
            <h1>Streamline Your Tutoring Business</h1>
            <p>
              Master student management, session tracking, and progress analysis
              with our comprehensive tutoring platform powered by AI
            </p>
            <p>
              Designed for independent tutors and educational professionals who want
              to focus on teaching, not paperwork
            </p>
            <div className="cta-buttons">
              <Link to="/auth/register" className="cta-button primary">
                Start Tutoring for Free
              </Link>
              <Link to="/auth/login" className="cta-button secondary">
                Login to Your Account
              </Link>
            </div>
          </div>
        </div>
        
        <div className="features-section">
          <div className="feature">
            <h3>Student Management</h3>
            <p>Easily add, edit, and organize your student information in one place</p>
          </div>
          <div className="feature">
            <h3>Session Tracking</h3>
            <p>Log and monitor tutoring sessions with detailed metrics and notes</p>
          </div>
          <div className="feature">
            <h3>AI-Powered Summaries</h3>
            <p>Generate professional session summaries with our AI integration</p>
          </div>
        </div>
      </div>
      
      <div className="tech-stack">
        <div className="tech-stack-header">
          <h3>Powered by modern technology</h3>
        </div>
        <div className="tech-logos">
          <div className="tech-logo">
            <img src={reactLogo} alt="React" />
            <span>React</span>
          </div>
          <div className="tech-logo">
            <img src={typescriptLogo} alt="TypeScript" />
            <span>TypeScript</span>
          </div>
          <div className="tech-logo">
            <img src={pythonLogo} alt="Python" />
            <span>Python</span>
          </div>
          <div className="tech-logo">
            <img src={fastApiLogo} alt="FastAPI" />
            <span>FastAPI</span>
          </div>
          <div className="tech-logo">
            <img src={postgresLogo} alt="PostgreSQL" />
            <span>PostgreSQL</span>
          </div>
          <div className="tech-logo">
            <img src={openaiLogo} alt="OpenAI" />
            <span>OpenAI</span>
          </div>
        </div>
      </div>
      
      <footer className="landing-footer">
        <p>© 2025 trakit.la - All rights reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
