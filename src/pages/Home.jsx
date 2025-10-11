import { Link } from 'react-router-dom';
import { teamData, teamStats } from '../data/teamData';
import { ArrowRight, Users, Trophy, Code, Star, Sparkles, Zap, Rocket, Brain, X, Mail, User, Phone, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const teamMembers = Object.values(teamData);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDescription: ''
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const techStack = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'AI/ML', icon: '🤖', color: '#FF6B6B' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create email content
    const subject = `New Project Inquiry from ${formData.name}`;
    const body = `
Hello AI-lians Team,

I would like to discuss a new project with you.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Project Description:
${formData.projectDescription}

Best regards,
${formData.name}
    `;

    // Create Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aiteam@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');

    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '', projectDescription: '' });
    setShowContactForm(false);
  };

  const openContactForm = () => {
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  return (
    <div className="home">
      {/* Cursor Follower */}
      <div
        className="cursor-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`bg-shape bg-shape-${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Building Tomorrow's Tech Today</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">
              <span className="word-animate">Meet</span>
              <span className="gradient-text word-animate">AI-lians</span>
            </span>
            <span className="title-line">
              <span className="word-animate">The Future</span>
              <span className="word-animate">Squad</span>
              <span className="wave">🚀</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            We're not just developers – we're digital architects crafting
            <span className="highlight"> intelligent solutions</span> that transform ideas into reality ✨
          </p>

          <div className="hero-actions">
            <button className="cta-primary" onClick={openContactForm}>
              <Rocket size={18} />
              <span>Start Your Project</span>
              <div className="button-glow"></div>
            </button>
            <a
              href="mailto:aiteam@gmail.com?subject=Let's Connect - AI-lians Team&body=Hi AI-lians Team,%0D%0A%0D%0AI would like to connect with you to discuss potential collaboration opportunities.%0D%0A%0D%0ABest regards"
              className="cta-secondary"
            >
              <Mail size={18} />
              <span>Email Us</span>
            </a>
          </div>

          <div className="tech-stack-preview">
            <p className="tech-label">Powered by</p>
            <div className="tech-icons">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="tech-icon"
                  style={{ '--delay': `${index * 0.1}s`, '--color': tech.color }}
                >
                  <span className="tech-emoji">{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-element element-1">🚀</div>
            <div className="floating-element element-2">💻</div>
            <div className="floating-element element-3">⚡</div>
            <div className="floating-element element-4">🎯</div>
            <div className="floating-element element-5">🤖</div>
            <div className="floating-element element-6">✨</div>
          </div>
        </div>
      </section>

      {/* Interactive Stats */}
      <section className="interactive-stats" id="stats">
        <div className="stats-container">
          {[
            { icon: Users, number: 5, label: 'Team Members', color: '#00d4ff', suffix: '' },
            { icon: Code, number: teamStats.totalProjects, label: 'Projects', color: '#a855f7', suffix: '+' },
            { icon: Trophy, number: teamStats.yearsExperience, label: 'Years Experience', color: '#4ecdc4', suffix: '+' },
            { icon: Star, number: teamStats.clientsSatisfied, label: 'Happy Clients', color: '#ffe66d', suffix: '+' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`interactive-stat ${isVisible.stats ? 'animate' : ''}`}
              style={{ '--delay': `${index * 0.2}s`, '--color': stat.color }}
            >
              <div className="stat-icon-wrapper">
                <stat.icon className="stat-icon" />
                <div className="icon-glow"></div>
              </div>
              <div className="stat-content">
                <span className="stat-number">{stat.number}{stat.suffix}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" id="team">
        <div className="section-header">
          <div className="section-badge">
            <Users size={16} />
            <span>Meet Our Squad</span>
          </div>
          <h2 className="section-title">The Humans Behind The Magic</h2>
          <p className="section-subtitle">
            Each member brings unique superpowers to our collective mission of building extraordinary digital experiences
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-card ${isVisible.team ? 'animate' : ''}`}
              style={{ '--delay': `${index * 0.15}s` }}
            >
              <div className="card-glow"></div>
              <div className="card-header">
                <div className="avatar-wrapper">
                  <div className="avatar">{member.avatar}</div>
                  <div className="avatar-ring"></div>
                  <div className="status-indicator"></div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-tagline">{member.tagline}</p>
                </div>
              </div>

              <div className="card-content">
                <p className="member-summary">
                  {member.summary.substring(0, 120)}...
                </p>

                <div className="skills-preview">
                  {Object.values(member.skills)[0]?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  <span className="skill-more">+{Object.values(member.skills).flat().length - 3} more</span>
                </div>

                <div className="member-stats">
                  <div className="member-stat">
                    <span className="stat-value">{member.experience?.length || 2}</span>
                    <span className="stat-label">Experience</span>
                  </div>
                  <div className="member-stat">
                    <span className="stat-value">{member.projects?.length || 3}</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="member-stat">
                    <span className="stat-value">{member.certifications?.length || 2}</span>
                    <span className="stat-label">Certs</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <Link to={`/profile/${member.id}`} className="view-profile-btn">
                  <span>Explore Profile</span>
                  <ArrowRight size={16} />
                  <div className="btn-particles"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="services-section" id="services">
        <div className="section-header">
          <div className="section-badge">
            <Zap size={16} />
            <span>Our Superpowers</span>
          </div>
          <h2 className="section-title">What We Craft</h2>
          <p className="section-subtitle">
            From concept to deployment, we build digital experiences that don't just work – they inspire
          </p>
        </div>

        <div className="services-grid">
          {[
            {
              icon: '🎯',
              title: 'Project Management',
              description: 'From vision to reality - we orchestrate the entire journey with precision and care.',
              features: ['Agile Methodology', 'Risk Management', 'Client Communication'],
              color: '#ff6b6b'
            },
            {
              icon: '🤖',
              title: 'AI & Machine Learning',
              description: 'Cutting-edge AI solutions that make your business smarter and more efficient.',
              features: ['LLM Integration', 'Computer Vision', 'Predictive Analytics'],
              color: '#4ecdc4'
            },
            {
              icon: '🗄️',
              title: 'Database Architecture',
              description: 'Rock-solid data foundations that scale with your growing ambitions.',
              features: ['MongoDB', 'PostgreSQL', 'Data Modeling'],
              color: '#ffe66d'
            },
            {
              icon: '⚡',
              title: 'Backend Development',
              description: 'Lightning-fast APIs and robust server solutions that never sleep.',
              features: ['Node.js', 'Python', 'Microservices'],
              color: '#a855f7'
            },
            {
              icon: '🌐',
              title: 'Full-Stack Magic',
              description: 'End-to-end web solutions that look stunning and perform flawlessly.',
              features: ['React', 'TypeScript', 'Responsive Design'],
              color: '#00d4ff'
            },
            {
              icon: '📊',
              title: 'Data Science',
              description: 'Transform raw data into actionable insights and strategic advantages.',
              features: ['Analytics', 'Visualization', 'Business Intelligence'],
              color: '#ff9f43'
            }
          ].map((service, index) => (
            <div
              key={index}
              className={`service-card ${isVisible.services ? 'animate' : ''}`}
              style={{ '--delay': `${index * 0.1}s`, '--accent-color': service.color }}
            >
              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <div className="service-glow"></div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">{feature}</span>
                ))}
              </div>
              <div className="service-hover-effect"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="cta-section" id="cta">
        <div className="cta-background">
          <div className="cta-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`particle particle-${i}`}></div>
            ))}
          </div>
        </div>

        <div className="cta-content">
          <div className="cta-badge">
            <Rocket size={16} />
            <span>Ready to Launch?</span>
          </div>

          <h2 className="cta-title">
            Let's Build Something
            <span className="gradient-text"> Extraordinary</span>
          </h2>

          <p className="cta-subtitle">
            Your next breakthrough is just a conversation away.
            Let's turn your wildest ideas into digital reality! 🚀
          </p>

          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={openContactForm}>
              <span>Start Your Project</span>
              <Rocket size={18} />
              <div className="btn-ripple"></div>
            </button>
            <a
              href="mailto:aiteam@gmail.com?subject=Let's Connect - AI-lians Team&body=Hi AI-lians Team,%0D%0A%0D%0AI would like to connect with you to discuss potential collaboration opportunities.%0D%0A%0D%0ABest regards"
              className="cta-btn secondary"
            >
              <span>Email Us</span>
              <Mail size={18} />
            </a>
          </div>

          <div className="cta-social-proof">
            <div className="proof-item">
              <span className="proof-number">100%</span>
              <span className="proof-label">Client Satisfaction</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">24/7</span>
              <span className="proof-label">Support</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">∞</span>
              <span className="proof-label">Possibilities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="modal-overlay" onClick={closeContactForm}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <Rocket size={24} />
                Start Your Project
              </h2>
              <button className="close-btn" onClick={closeContactForm}>
                <X size={24} />
              </button>
            </div>

            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <Phone size={18} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectDescription">
                  <FileText size={18} />
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project, requirements, and goals..."
                  rows="5"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeContactForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <Mail size={18} />
                  Send via Gmail
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;