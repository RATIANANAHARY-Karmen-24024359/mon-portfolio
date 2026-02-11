import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail, FileText, Phone, MapPin, Github, Linkedin,
  Code, Briefcase, GraduationCap, User, Home,
  FolderOpen, Award, MessageCircle, ChevronDown, Terminal
} from 'lucide-react';
import './App.css';

/* ── Particles Background ── */
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 204, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 204, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
};

/* ── Typing Effect Hook ── */
const useTypingEffect = (texts, speed = 80, pause = 2000) => {
  const [display, setDisplay] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplay(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setDisplay(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return display;
};

/* ── Scroll Reveal Hook (reversible) ── */
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return [ref, isVisible];
};

/* ── ScrollReveal Wrapper ── */
const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


/* ════════════════════════════════════════════
   PORTFOLIO COMPONENT
   ════════════════════════════════════════════ */

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const typedText = useTypingEffect([
    'Conception & Développement',
    'Applications Web & Mobile',
    'Data & Intelligence Artificielle',
  ], 70, 2500);

  /* ── Scroll Spy ── */
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'parcours', 'competences', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Data ── */
  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'parcours', label: 'Parcours', icon: GraduationCap },
    { id: 'competences', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  const projects = [
    {
      title: 'Super Bomberman',
      tech: 'JavaFX',
      description: "Jeu complet développé en JavaFX, inspiré de Bomberman, avec des sprites réalisés et intégrés manuellement. Éditeur de niveaux, gestion de profils, sauvegarde des scores et architecture MVC.",
      image: '/super-bomberman.png',
    },
    {
      title: 'Infrastructure Réseau',
      tech: 'Linux',
      description: "Projet réalisé sous Debian avec 3 VMs en réseau local via QEMU. Serveur Apache, DNS, SMTP et IMAP, hébergement d'un site statique et tests de messagerie avec Thunderbird.",
      image: '/serveur_apache.png',
    },
    {
      title: 'Site Web Responsive',
      tech: 'HTML/CSS/JS',
      description: "Site responsive développé en HTML, CSS et JavaScript. Normes W3C, bonnes pratiques SEO et accessibilité. Formulaire, vidéo sous-titrée, changement de thème et navigation fluide.",
      image: '/site_web.png',
    },
    {
      title: 'Interface UX/UI',
      tech: 'Figma',
      description: "Application multi-support pour un circuit découverte à Aix-en-Provence. Maquettes interactives avec Figma pour structurer l'UX et préparer le développement.",
      image: '/maquette.png',
    },
    {
      title: 'Pac-Man',
      tech: 'C++ (Qt)',
      description: "Jeu arcade développé en C++ avec Qt Creator. Gestion rigoureuse des fichiers d'entrées/sorties, sauvegarde des scores, code documenté avec docstrings.",
      image: '/pac-man.png',
    },
    {
      title: 'Tournoi eSport',
      tech: 'Gestion de projet',
      description: "Organisation d'un tournoi inter-promo : Lean Canvas, personas, gestion des sponsors. Objectif : cohésion étudiante et expérience compétitive inclusive.",
      image: '/esport.png',
    },
  ];

  const formations = [
    {
      year: '2024 — en cours',
      title: 'BUT Informatique',
      institution: "IUT d'Aix-Marseille, Gaston Berger",
      location: 'Aix-en-Provence',
      type: 'formation',
      description: "Bases solides en programmation, réseaux et conception logicielle. Un choix mûrement réfléchi depuis la spécialité NSI au lycée.",
    },
    {
      year: '2024',
      title: 'Bac Général',
      institution: 'Lycée Nelson Mandela',
      location: 'Marseille',
      details: 'Spé Maths & Physique-Chimie — Mention Assez Bien',
      type: 'formation',
      description: "Rigueur scientifique et découverte de mon intérêt pour la logique et la résolution de problèmes.",
    },
    {
      year: '2024 — en cours',
      title: 'Commission technique & communication',
      institution: 'FPMA Aix-Marseille',
      details: 'Site web, streaming, sonorisation, vidéos & flyers',
      type: 'experience',
      description: "Polyvalence et autonomie dans un contexte associatif. Communication visuelle et technique au service de projets collectifs.",
    },
  ];

  const competencesTechniques = [
    {
      category: 'Langages',
      skills: ['Python', 'C++', 'Java', 'JavaFX', 'HTML', 'CSS', 'JavaScript', 'SQL*Plus', 'PHP'],
      color: 'skill-orange',
    },
    {
      category: 'Réseau',
      skills: ['TCP/UDP', 'SSH', 'DNS', 'SMTP/IMAP', 'HTTP', 'ARP', 'ICMP', 'IPv4'],
      color: 'skill-amber',
    },
    {
      category: 'Systèmes',
      skills: ['Linux (ISO perso)'],
      color: 'skill-yellow',
    },
    {
      category: 'Outils',
      skills: ['Figma', 'IntelliJ', 'Qt Creator', 'PhpStorm', 'GitHub', 'Packet Tracer', 'Spyder', 'Jupyter'],
      color: 'skill-red',
    },
  ];

  const softSkills = [
    'Curieuse', 'Autonome', 'Organisée', 'Créative',
    'Enthousiaste', "Esprit d'équipe", "Esprit d'initiative",
  ];

  /* ════════════════════════════════════
     RENDER
     ════════════════════════════════════ */
  return (
    <div className="portfolio">
      <ParticlesBackground />

      {/* ── Navigation ── */}
      <nav className="navbar" role="navigation" aria-label="Navigation principale">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-brand" aria-label="Accueil">
              <Terminal size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle', color: '#00ffcc' }} />
              karmen.dev
            </div>

            {/* Desktop */}
            <div className="navbar-menu" role="menubar">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`menu-item ${activeSection === id ? 'active' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === id ? 'page' : undefined}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile */}
            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="hamburger">
                <span className={`hamburger-line ${isMenuOpen ? 'line-1-open' : 'line-1'}`} />
                <span className={`hamburger-line ${isMenuOpen ? 'line-2-open' : 'line-2'}`} />
                <span className={`hamburger-line ${isMenuOpen ? 'line-3-open' : 'line-3'}`} />
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu" role="menu">
            <div className="mobile-menu-content">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`mobile-menu-item ${activeSection === id ? 'active' : ''}`}
                  role="menuitem"
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="hero-section" aria-label="Présentation">
        <div className="container">
          <div className="hero-row">
            <div className="hero-photo">
              <div className="photo-frame">
                {!imgError ? (
                  <img
                    src="/photo_profil.png"
                    alt="Karmen RATIANANAHARY, développeuse informatique"
                    className="avatar-image"
                    onError={() => setImgError(true)}
                    loading="eager"
                    width="280"
                    height="340"
                  />
                ) : (
                  <div className="avatar-fallback">Photo non disponible</div>
                )}
              </div>
            </div>

            <div className="hero-intro">
              <p className="hero-greeting">{'// Bienvenue sur mon portfolio'}</p>
              <h1 className="hero-title">
                Salut, je suis{' '}
                <span className="hero-name">Karmen</span>
              </h1>

              <div className="hero-subtitle">
                <span className="hero-subtitle-small">
                  Étudiante en BUT Informatique, à la recherche d'un stage de 10 semaines à partir du 13 avril 2026 en
                </span>
                <span className="hero-subtitle-tag">
                  {typedText}<span className="typing-cursor" aria-hidden="true" />
                </span>
              </div>

              <div className="hero-info">
                <div className="hero-info-item">
                  <MapPin size={16} aria-hidden="true" />
                  <span>Marseille, France</span>
                </div>
                <div className="hero-info-item">
                  <GraduationCap size={16} aria-hidden="true" />
                  <span>BUT Informatique — 2ᵉ année</span>
                </div>
              </div>

              <div className="hero-buttons">
                <a href="mailto:karmen.ratiananahary@gmail.com" className="btn btn-primary" aria-label="Envoyer un e-mail">
                  <Mail size={16} aria-hidden="true" />
                  <span>Me contacter</span>
                </a>
                <a href="/cv-karmen.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer" aria-label="Télécharger mon CV (PDF)">
                  <FileText size={16} aria-hidden="true" />
                  <span>Mon CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>SCROLL</span>
          <div className="scroll-indicator-line" />
          <ChevronDown size={14} />
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="projects-section" aria-label="Mes projets">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Mes <span className="title-accent">Projets</span>
            </h2>
          </ScrollReveal>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 100}>
                <article className="project-card">
                  <div className="project-header">
                    <img
                      src={project.image}
                      alt={`Aperçu du projet ${project.title}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="project-content">
                    <div className="project-title-row">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-tech">{project.tech}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="projects-footer">
              <p>
                Retrouvez ces projets sur mon{' '}
                <a
                  href="https://github.com/RATIANANAHARY-Karmen-24024359"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir mon profil GitHub"
                >
                  GitHub ↗
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Parcours ── */}
      <section id="parcours" className="parcours-section" aria-label="Mon parcours">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Mon <span className="title-accent">Parcours</span>
            </h2>
          </ScrollReveal>

          <div className="timeline" role="list" aria-label="Chronologie de mon parcours">
            <div className="timeline-line" aria-hidden="true" />

            {formations.map((item, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div
                  className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                  role="listitem"
                >
                  <div className="timeline-content">
                    <div className="timeline-card">
                      <div className="timeline-header">
                        {item.type === 'formation' ? (
                          <GraduationCap className="timeline-icon formation" size={22} aria-hidden="true" />
                        ) : (
                          <Briefcase className="timeline-icon experience" size={22} aria-hidden="true" />
                        )}
                        <span className="timeline-year">{item.year}</span>
                      </div>
                      <h3 className="timeline-title">{item.title}</h3>
                      <p className="timeline-institution">{item.institution}</p>
                      {item.location && <p className="timeline-location">{item.location}</p>}
                      {item.details && <p className="timeline-details">{item.details}</p>}
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </div>
                  <div className="timeline-dot" aria-hidden="true" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compétences ── */}
      <section id="competences" className="competences-section" aria-label="Mes compétences">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Mes <span className="title-accent">Compétences</span>
            </h2>
          </ScrollReveal>

          <div className="competences-grid">
            {/* Technical */}
            <ScrollReveal delay={100}>
              <div className="competences-column">
                <h3 className="competences-title">
                  <Code className="competences-icon" size={24} aria-hidden="true" />
                  Compétences Techniques
                </h3>

                <div className="competences-categories">
                  {competencesTechniques.map((category, index) => (
                    <div key={index} className="competences-category">
                      <h4 className="category-title">{category.category}</h4>
                      <div className="skills-list" role="list">
                        {category.skills.map((skill, si) => (
                          <span key={si} className={`skill-tag ${category.color}`} role="listitem">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Soft Skills */}
            <ScrollReveal delay={250}>
              <div className="competences-column">
                <h3 className="competences-title">
                  <User className="competences-icon soft-skills" size={24} aria-hidden="true" />
                  Compétences Personnelles
                </h3>

                <div className="soft-skills-container">
                  <div className="soft-skills-grid" role="list">
                    {softSkills.map((skill, index) => (
                      <div key={index} className="soft-skill-item" role="listitem">
                        <div className="soft-skill-dot" aria-hidden="true" />
                        <span className="soft-skill-text">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-section" aria-label="Me contacter">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Me <span className="title-accent">Contacter</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="contact-content">
              <p className="contact-description">
                À la recherche d'une stagiaire passionnée et motivée ?
                <br />N'hésitez pas à me contacter !
              </p>

              <div className="contact-links">
                <a href="mailto:karmen.ratiananahary@gmail.com" className="contact-link" aria-label="Envoyer un e-mail">
                  <Mail size={22} aria-hidden="true" />
                  <span>karmen.ratiananahary@gmail.com</span>
                </a>
                <a href="tel:+33783704139" className="contact-link" aria-label="Appeler par téléphone">
                  <Phone size={22} aria-hidden="true" />
                  <span>07 83 70 41 39</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a
                href="https://www.linkedin.com/in/karmen-ratiananahary-523007369/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="Profil LinkedIn"
              >
                <Linkedin size={20} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/RATIANANAHARY-Karmen-24024359"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="Profil GitHub"
              >
                <Github size={20} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Karmen RATIANANAHARY — Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;