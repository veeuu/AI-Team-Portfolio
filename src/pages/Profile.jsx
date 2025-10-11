import { useParams, Link } from 'react-router-dom';
import { teamData } from '../data/teamData';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    ExternalLink,
    Calendar,
    Award,
    Briefcase,
    GraduationCap,
    Code,
    Trophy
} from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const member = teamData[id];

    if (!member) {
        return (
            <div className="profile-not-found">
                <h2>Profile not found 😅</h2>
                <Link to="/" className="back-btn">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="profile">
            {/* Header */}
            <div className="profile-header">
                <Link to="/" className="back-btn">
                    <ArrowLeft size={16} />
                    Back to Team
                </Link>

                <div className="profile-hero">
                    <div className="profile-avatar">{member.avatar}</div>
                    <div className="profile-info">
                        <h1 className="profile-name">{member.name}</h1>
                        <p className="profile-role">{member.role}</p>
                        <p className="profile-tagline">{member.tagline}</p>

                        <div className="contact-info">
                            <a href={`mailto:${member.email}`} className="contact-item">
                                <Mail size={16} />
                                <span>{member.email}</span>
                            </a>
                            <a href={`tel:${member.phone}`} className="contact-item">
                                <Phone size={16} />
                                <span>{member.phone}</span>
                            </a>
                            <div className="contact-item">
                                <MapPin size={16} />
                                <span>{member.location}</span>
                            </div>
                            <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                                <Linkedin size={16} />
                                <span>LinkedIn</span>
                            </a>
                            <a href={`https://${member.github}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                                <Github size={16} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="profile-content">
                {/* Summary */}
                <section className="profile-section">
                    <h2 className="section-title">
                        <Briefcase size={20} />
                        About
                    </h2>
                    <p className="summary">{member.summary}</p>
                </section>

                {/* Skills */}
                <section className="profile-section">
                    <h2 className="section-title">
                        <Code size={20} />
                        Skills & Technologies
                    </h2>
                    <div className="skills-container">
                        {Object.entries(member.skills).map(([category, skills]) => (
                            <div key={category} className="skill-category">
                                <h3 className="skill-category-title">{category}</h3>
                                <div className="skills-list">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section className="profile-section">
                    <h2 className="section-title">
                        <Briefcase size={20} />
                        Experience
                    </h2>
                    <div className="timeline">
                        {member.experience.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <h3 className="timeline-title">{exp.role}</h3>
                                        <span className="timeline-company">{exp.company}</span>
                                        <span className="timeline-duration">
                                            <Calendar size={14} />
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="timeline-description">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="profile-section">
                    <h2 className="section-title">
                        <GraduationCap size={20} />
                        Education
                    </h2>
                    <div className="education-list">
                        {member.education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <div className="education-header">
                                    <h3 className="education-degree">{edu.degree}</h3>
                                    <span className="education-grade">{edu.grade}</span>
                                </div>
                                <p className="education-institution">{edu.institution}</p>
                                <span className="education-duration">{edu.duration}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="profile-section">
                    <h2 className="section-title">
                        <Code size={20} />
                        Featured Projects
                    </h2>
                    <div className="projects-grid">
                        {member.projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <div className="project-header">
                                    <h3 className="project-name">{project.name}</h3>
                                    {project.link && project.link !== '#' && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech">
                                    {project.tech.map((tech, techIndex) => (
                                        <span key={techIndex} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section className="profile-section">
                    <h2 className="section-title">
                        <Award size={20} />
                        Certifications
                    </h2>
                    <div className="certifications-list">
                        {member.certifications.map((cert, index) => (
                            <div key={index} className="certification-item">
                                <Award size={16} />
                                <span>{cert}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Achievements */}
                {member.achievements && (
                    <section className="profile-section">
                        <h2 className="section-title">
                            <Trophy size={20} />
                            Key Achievements
                        </h2>
                        <div className="achievements-list">
                            {member.achievements.map((achievement, index) => (
                                <div key={index} className="achievement-item">
                                    <Trophy size={16} />
                                    <span>{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Profile;