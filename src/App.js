import React, { useState, useEffect } from 'react';
import { Mail, FileText, Phone, MapPin, Github, Linkedin, Code, Briefcase, GraduationCap, User, Home, FolderOpen, Award, MessageCircle } from 'lucide-react';
import './App.css';


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'parcours', 'competences', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'parcours', label: 'Parcours', icon: GraduationCap },
    { id: 'competences', label: 'Compétences', icon: Award },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

  const projects = [
    {
      title: "Super Bomberman",
      tech: "JavaFX",
      description: "Jeu complet développé en JavaFX, inspiré de Bomberman, avec des sprites réalisés et intégrés manuellement pour un rendu personnalisé. Contient éditeur de niveaux intégré, gestion de profils utilisateurs, sauvegarde des scores et interface fluide en architecture MVC.",
      image: "/super-bomberman.png",
    },
    {
      title: "Infrastructure Réseau",
      tech: "Linux",
      description: "Projet réalisé sous Debian avec 3 VMs configurées en réseau local via QAMU. Mise en place d’un serveur Apache, DNS, SMTP et IMAP, hébergement d’un site statique, gestion de zones DNS et tests de messagerie avec Thunderbird.",
      image: "/serveur_apache.png",
    },
    {
      title: "Site Web Responsive",
      tech: "HTML/CSS/JS",
      description: "Site web responsive développé en HTML, CSS et JavaScript, respectant les normes W3C et les bonnes pratiques SEO et d’accessibilité. Hébergé en ligne, il intègre formulaire, vidéo sous-titrée, changement de thème, et navigation fluide sur tous les appareils.",
      image: "/site_web.png",
    },
    {
      title: "Interface UX/UI",
      tech: "Figma",
      description: "Projet de création d’une application multi-support pour un circuit découverte pédestre et cyclable à Aix-en-Provence. Des maquettes interactives réalisées avec Figma ont permis de structurer les idées, tester l’expérience utilisateur et poser une base solide avant le développement.",
      image: "/maquette.png",
    },
    {
      title: "Pac-Man",
      tech: "C++ (Qt)",
      description: "Jeu arcade développé en C++ avec Qt Creator, intégrant une gestion rigoureuse des fichiers d’entrées/sorties pour sauvegarder les scores et paramètres. Le code est documenté avec des commentaires clairs (docstrings) pour assurer la maintenabilité et faciliter les évolutions futures.",
      image: "/pac-man.png",
    },
    {
      title: "Tournoi eSport",
      tech: "Gestion projet /Commmunication",
      description: "Organisation d’un tournoi inter-promo répondant au besoin client d’un événement accessible à tous types de compétiteurs. Réalisation d’un Lean Canvas, création de personas, répartition des tâches au sein de l’équipe et gestion des sponsors. L’objectif est de favoriser la cohésion étudiante, promouvoir le BDE et offrir une expérience compétitive et inclusive.",
      image: "/esport.png",
    }
  ];

  const formations = [
  {
    year: "2024 - en cours",
    title: "BUT Informatique",
    institution: "IUT d'Aix-Marseille, Gaston Berger",
    location: "Aix-en-Provence",
    type: "formation",
    description: "Ce BUT me permet d'acquérir des bases solides en programmation, réseaux et conception logicielle. J'ai découvert l'informatique en classe de 1ère au lycée, grâce à la spécialité NSI. Pour moi, c'est un choix mûrement réfléchi, car j'apprécie ce domaine et je souhaite évoluer dans le développement tout en gardant une approche concrète et créative."

  },
  {
    year: "2024",
    title: "Bac Général",
    institution: "Lycée Nelson Mandela",
    location: "Marseille",
    details: "Spé Maths & Physique-Chimie - Mention Assez Bien",
    type: "formation",
    description: "Le Baccalauréat m’a appris la rigueur scientifique et m’a permis de découvrir mon intérêt pour la logique et la résolution de problèmes. Les spécialités choisies m’ont préparée aux études en informatique."
  },
  {
    year: "2024 - en cours",
    title: "Commission technique & communication",
    institution: "FPMA Aix-Marseille",
    details: "Maintenance site web, streaming, sonorisation, création vidéos & flyers",
    type: "experience",
    description: "J’ai appris à être polyvalente et autonome dans un contexte associatif. Cela m’a permis d’explorer la communication visuelle et la technique au service de projets collectifs."
  }
];


  const competencesTechniques = [
    {
      category: "Langages",
      skills: ["Python", "C++", "Java", "JavaFX", "HTML", "CSS", "JavaScript", "SQL*Plus", "MIPS"],
      color: "skill-orange"
    },
    {
      category: "Réseau",
      skills: ["TCP/UDP", "SSH", "DNS", "SMTP/IMAP", "HTTP", "ARP", "ICMP", "DNS"],
      color: "skill-amber"
    },
    {
      category: "Systèmes",
      skills: ["Linux (ISO perso)", "Windows"],
      color: "skill-yellow"
    },
    {
      category: "Outils",
      skills: ["Figma", "IntelliJ", "Qt Creator", "Wireshark", "GitHub", "Packet Tracer"],
      color: "skill-red"
    }
  ];

  const softSkills = [
    "Curieuse", "Autonome", "Organisée", "Créative", 
    "Enthousiaste", "Esprit d'équipe", "Esprit d'initiative"
  ];

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-brand">
              Karmen RATIANANAHARY
            </div>
            
            {/* Desktop Menu */}
            <div className="navbar-menu">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`menu-item ${activeSection === id ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="hamburger">
                <span className={`hamburger-line ${isMenuOpen ? 'line-1-open' : 'line-1'}`}></span>
                <span className={`hamburger-line ${isMenuOpen ? 'line-2-open' : 'line-2'}`}></span>
                <span className={`hamburger-line ${isMenuOpen ? 'line-3-open' : 'line-3'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`mobile-menu-item ${activeSection === id ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-row">
          <div className="hero-photo">
            <div className="photo-frame">
              {!imgError ? (
                <img 
                  src="/photo_profil.png" 
                  alt="Karmen RATIANANAHARY" 
                  className="avatar-image"
                  onError={() => setImgError(true)}
                />
                  ) : (
                <div className="avatar-fallback">Photo non disponible</div>
              )}              
              </div>
            </div>
            <div className="hero-intro">
              <h1 className="hero-title">
                Salut, je suis <span className="hero-name">Karmen</span>
              </h1>
              <p className="hero-subtitle">
                <span className="hero-subtitle-small">Je suis à la recherche d'une alternance en</span><br />
                 <span className="hero-subtitle-tag">
                  Conception et développement d'applications
                </span>
              </p>
              <p className="hero-subtitle">
                Intéressée par des rôles de :<br />
                <span className="hero-subtitle-small">UX/UI Designer & Développeuse web/d'appplications</span>
              </p>            
              
              <div className="hero-info">
                <div className="hero-info-item">
                  <MapPin size={18} />
                  <span>Marseille</span>
                </div>
                <div className="hero-info-item">
                  <GraduationCap size={18} />
                  <span>BUT Informatique - 1ère année</span>
                </div>
              </div>
              <div className="hero-buttons">
                <a href="mailto:karmen.ratiananahary@gmail.com" className="btn btn-primary">
                  <Mail size={18} />
                  <span>Me contacter</span>
                </a>
                <a href="/cv-karmen.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  <FileText size={18} />
                  <span>Mon CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">
            <span className="title-accent">Projets</span>
          </h2>
          
          <div className="projects-container">
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <img src={project.image} alt={`aperçu de ${project.title}`} />
                  </div>
                  <div className="project-content">
                    <div className="project-title-row">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-tech">{project.tech}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parcours Section */}
      <section id="parcours" className="parcours-section">
        <div className="container">
          <h2 className="section-title">
            Mon <span className="title-accent">Parcours</span>
          </h2>
          
          <div className="timeline">
            <div className="timeline-line"></div>
            
            {formations.map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-card">
                    <div className="timeline-header">
                      {item.type === 'formation' ? (
                        <GraduationCap className="timeline-icon formation" size={24} />
                      ) : (
                        <Briefcase className="timeline-icon experience" size={24} />
                      )}
                      <span className="timeline-year">{item.year}</span>
                    </div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-institution">{item.institution}</p>
                    <p className="timeline-location">{item.location}</p>
                    {item.details && (
                      <p className="timeline-details">{item.details}</p>
                    )}
                    <p className="timeline-description">{item.description}</p>

                  </div>
                </div>
                
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competences Section */}
      <section id="competences" className="competences-section">
        <div className="container">
          <h2 className="section-title">
            Mes <span className="title-accent">Compétences</span>
          </h2>
          
          <div className="competences-grid">
            {/* Compétences Techniques */}
            <div className="competences-column">
              <h3 className="competences-title">
                <Code className="competences-icon" size={28} />
                Compétences Techniques
              </h3>
              
              <div className="competences-categories">
                {competencesTechniques.map((category, index) => (
                  <div key={index} className="competences-category">
                    <h4 className="category-title">{category.category}</h4>
                    <div className="skills-list">
                      {category.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className={`skill-tag ${category.color}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Soft Skills */}
            <div className="competences-column">
              <h3 className="competences-title">
                <User className="competences-icon soft-skills" size={28} />
                Compétences Personnelles
              </h3>
              
              <div className="soft-skills-container">
                <div className="soft-skills-grid">
                  {softSkills.map((skill, index) => (
                    <div key={index} className="soft-skill-item">
                      <div className="soft-skill-dot"></div>
                      <span className="soft-skill-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">
            Me <span className="title-accent">Contacter</span>
          </h2>
          
          <div className="contact-content">
            <p className="contact-description">
              À la recherche d'une alternante ? N'hésitez pas à me contacter !
            </p>
            
            <div className="contact-links">
              <a href="mailto:karmen.ratiananahary@gmail.com" className="contact-link">
                <Mail size={24} />
                <span>karmen.ratiananahary@gmail.com</span>
              </a>
              
              <a href="tel:0783704139" className="contact-link">
                <Phone size={24} />
                <span>07 83 70 41 39</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a href="https://www.linkedin.com/in/karmen-ratiananahary-523007369/" className="footer-link">
                <Linkedin size={24} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/RATIANANAHARY-Karmen-24024359" className="footer-link">
                <Github size={24} />
                <span>GitHub</span>
              </a>
            </div>
            <p className="footer-copyright">
              © 2024 Karmen RATIANANAHARY - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;