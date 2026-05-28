import { useState, useEffect } from 'react';
import scvPdf from './resume/SCV.pdf';

// Custom inline SVG icons for Showcasy minimalist navigation
const Icons = {
    ChevronDown: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
    ),
    ChevronRight: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
    ),
    Award: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
    ),
    BookOpen: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    ),
    Code: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
    Html5: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625 10.027.001.242-2.625H5.437l.72 8.125h8.175l-.317 3.328-2.038.551-2.051-.555-.131-1.472H7.135l.252 2.872 4.59 1.24 4.572-1.24.606-6.627H8.531z"/></svg>
    ),
    Css3: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm5.625 15.228l.24 2.68 4.612 1.253 4.593-1.253.6-6.637H7.497l-.23-2.625h11.233l.244-2.625H4.414l.72 8.125h9.375l-.32 3.328-2.044.551-2.05-.555-.25-2.88H7.125z"/></svg>
    ),
    Js: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.268c-.153-.889-.966-1.56-2.528-1.921-.778-.18-1.396-.345-1.856-.495-.461-.151-.716-.301-.767-.451-.049-.15-.02-.321.09-.509.112-.19.345-.301.7-.333.354-.03.62.06.797.27.177.208.271.55.282 1.026l2.36-.271c-.056-1.077-.495-1.902-1.316-2.47-.819-.569-1.889-.839-3.2-.809-1.428.03-2.502.435-3.22 1.216-.718.78-.992 1.74-.82 2.879.135 1.018.78 1.767 1.936 2.25.992.42 2.392.748 4.2.989.673.106 1.119.24 1.341.405.222.164.298.39.227.674-.084.33-.404.538-.962.616-.557.078-1.03-.016-1.42-.281-.39-.266-.63-.734-.72-1.406l-2.4.297c.189 1.545.898 2.622 2.127 3.228 1.23.604 2.748.653 4.55.146 1.625-.455 2.709-1.238 3.253-2.35.542-1.11.49-2.226-.157-3.344zm-14.77-1.35c-.179-.675-.584-1.155-1.214-1.439-.63-.286-1.385-.359-2.263-.225-.878.135-1.506.495-1.884 1.08-.378.585-.45 1.305-.214 2.159.214.78.694 1.319 1.439 1.619.746.301 1.748.271 3.013-.09l-.495 1.979c-.945.315-1.88.428-2.803.338-.923-.09-1.747-.413-2.473-.974-.727-.562-1.214-1.328-1.462-2.295-.316-1.229-.214-2.398.305-3.509.519-1.11 1.41-1.921 2.673-2.43 1.264-.509 2.744-.57 4.444-.18 1.688.389 2.879 1.214 3.576 2.474.697 1.26.819 2.745.36 4.455h-2.902c-.114-.99-.346-1.68-.696-2.071z"/></svg>
    ),
    React: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8.783c-1.854 0-3.36 1.505-3.36 3.359s1.506 3.359 3.36 3.359 3.36-1.505 3.36-3.359-1.506-3.359-3.36-3.359zm12 3.359c0 1.21-.861 2.378-2.422 3.292 1.56.914 2.422 2.083 2.422 3.293 0 2.417-3.955 4.377-8.834 4.377-2.316 0-4.428-.445-6.002-1.173a14.793 14.793 0 0 1-2.83 1.173c-4.88 0-8.834-1.96-8.834-4.377 0-1.21.86-2.379 2.421-3.293-1.56-.914-2.421-2.083-2.421-3.292 0-2.418 3.954-4.378 8.834-4.378 2.316 0 4.428.445 6.002 1.172a14.793 14.793 0 0 1 2.83-1.172c4.88 0 8.834 1.96 8.834 4.378zm-1.8 0c0-.82-.676-1.63-1.91-2.274a27.135 27.135 0 0 0-4.004-1.615c1.47-1.196 2.354-2.39 2.354-3.411 0-1.597-2.902-2.892-6.48-2.892-1.7 0-3.255.293-4.41.772a27.27 27.27 0 0 0 2.22 2.274c1.47 1.197 2.868 2.505 4.148 3.88a27.094 27.094 0 0 0 4.148-3.88 27.27 27.27 0 0 0 2.22-2.274c-1.155-.479-2.71-.772-4.41-.772-3.578 0-6.48 1.295-6.48 2.892 0 1.021.884 2.215 2.354 3.411a27.135 27.135 0 0 0-4.004 1.615c-1.234.644-1.91 1.455-1.91 2.274 0 .82.676 1.63 1.91 2.274a27.135 27.135 0 0 0 4.004 1.615c-1.47 1.196-2.354 2.39-2.354 3.411 0 1.597 2.902 2.892 6.48 2.892 1.7 0 3.255-.293c2.723 0 5.214.445 6.788 1.173a14.793 14.793 0 0 1-2.83-1.173h-2.18c-3.578 0-6.48-1.295-6.48-2.892z"/></svg>
    ),
    Bootstrap: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9.418 20.41H5.438V3.59h5.688c2.143 0 3.758.468 4.84 1.406 1.082.937 1.624 2.298 1.624 4.082 0 1.258-.294 2.308-.88 3.149-.588.841-1.42 1.405-2.493 1.691v.098c1.378.23 2.428.841 3.15 1.834.723.992 1.084 2.263 1.084 3.816 0 1.936-.598 3.472-1.793 4.61-1.196 1.137-2.923 1.706-5.183 1.706h-.068zm.004-10.229h2.247c1.077 0 1.895-.198 2.355-.595.461-.397.691-.989.691-1.776 0-.825-.23-1.417-.691-1.777-.46-.359-1.278-.539-2.355-.539H9.422v4.687zm0 7.333h2.648c1.17 0 2.052-.224 2.646-.67.595-.446.893-1.11.893-1.993 0-.868-.298-1.513-.893-1.937-.594-.424-1.476-.636-2.646-.636H9.422v5.236z"/></svg>
    ),
    RestApi: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M5 16v-3a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3" /><path d="M12 8v8" /></svg>
    )
};

const getRandomColor = (str) => {
    const colors = ['bg-blue', 'bg-yellow', 'bg-pink', 'bg-purple'];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export default function Home() {
    // --- States ---
    const [scrolled, setScrolled] = useState(false);
    const [expandedExperience, setExpandedExperience] = useState(1); // Default expanded first role
    const [skillsTab, setSkillsTab] = useState('all');
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isCursorHovered, setIsCursorHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    // Scroll header listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close modals on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowMenuModal(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Custom cursor tracker for desktop viewports
    useEffect(() => {
        const canvas = document.querySelector('.canvas-page');
        if (!canvas) return;

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            const target = e.target;
            if (
                target &&
                (target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.closest('a') ||
                    target.closest('button') ||
                    target.closest('.timeline-expand-btn') ||
                    target.closest('.skills-tab-btn'))
            ) {
                setIsLinkHovered(true);
            } else {
                setIsLinkHovered(false);
            }
        };

        const handleMouseEnter = () => {
            setIsCursorHovered(true);
        };

        const handleMouseLeave = () => {
            setIsCursorHovered(false);
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseenter', handleMouseEnter);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseenter', handleMouseEnter);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // --- Data Arrays ---
    const experiences = [
        {
            id: 1,
            role: "Angular Developer",
            company: "Colan Infotech Private Limited",
            duration: "2023 – Present",
            summary: "Leading frontend initiatives, migrating legacy diagnostics systems to ReactJS, and maintaining AngularJS healthcare portal applications.",
            achievements: [
                "Architected responsive SPA components using AngularJS and ReactJS, decreasing screen latency by 28%.",
                "Engineered scalable component packages utilizing TypeScript and clean layout styling.",
                "Integrated secure REST API connections and managed complex states using Redux Toolkit.",
                "Mentored junior developers regarding responsive layouts, accessibility compliance, and build processes."
            ]
        },
        {
            id: 2,
            role: "Associate Engineer IT (Software Developer)",
            company: "MedAll Healthcare Pvt Ltd",
            duration: "2022 – 2023",
            summary: "Focused on developing core diagnostics interfaces, mobile-friendly medical dashboards, and healthcare UI widgets.",
            achievements: [
                "Implemented HIPAA-compliant modules for diagnostic platforms and phlebotomist schedules.",
                "Refactored medical dashboard widgets converting them into responsive semantic web structures.",
                "Optimized REST API service connections and camera integration systems."
            ]
        },
        {
            id: 3,
            role: "Store Associate",
            company: "AB Global (Vanapadi)",
            duration: "2018 – 2021",
            summary: "Supported customer sales transactions, catalog inventory alignments, and store administration workflows.",
            achievements: [
                "Managed inventory checking databases and catalog logs with 100% accuracy rates.",
                "Coordinated customer relation pipelines resolving billing requests."
            ]
        }
    ];

    const projects = [
        {
            id: 1,
            title: "Home Collection Management Application",
            category: "Healthcare & Diagnostics",
            tech: ["AngularJS", "REST APIs", "CSS Grid"],
            desc: "An enterprise-grade diagnostic portal facilitating on-demand patient booking, sample collection scheduling, and phlebotomist tracking.",
            keyFeatures: [
                "Interactive booking timeslot selector widgets.",
                "Phlebotomist location mapping & route visualization.",
                "HIPAA-compliant patient medical records access control."
            ],
            mockupColor: "#eff6ff"
        },
        {
            id: 2,
            title: "UWin & ScanApp",
            category: "Operations & Utility Tools",
            tech: ["ReactJS", "TypeScript", "Camera APIs"],
            desc: "A highly resilient barcode scanning utility integrated directly with warehouse management modules for fast inventory verification.",
            keyFeatures: [
                "Real-time continuous scanning with custom viewport frames.",
                "Automated focus adjustments and success prompt sounds.",
                "Local cache buffer supporting offline validation sync."
            ],
            mockupColor: "#ecfdf5"
        },
        {
            id: 3,
            title: "Loan Dashboard",
            category: "Fintech Analytics",
            tech: ["ReactJS", "Redux Toolkit", "ChartJS"],
            desc: "An interactive, visually appealing financial dashboard tracking business lending, risk models, and application status.",
            keyFeatures: [
                "Custom charts mapping monthly loan distributions.",
                "Instant EMI calculation using variable sliders.",
                "Data tables sorting applications by risk profile."
            ],
            mockupColor: "#faf5ff"
        },
        {
            id: 4,
            title: "TVAM Website",
            category: "Brand & Corporate Site",
            tech: ["HTML5", "CSS3", "Vanilla JS", "GSAP"],
            desc: "A luxury lifestyle corporate presence featuring sleek design language, immersive graphics, and fluid scroll triggers.",
            keyFeatures: [
                "Custom fluid animations mirroring natural physics on scrolls.",
                "Integrated contact funnel with inline validation triggers.",
                "Excellent PageSpeed performance index scores."
            ],
            mockupColor: "#fffbeb"
        },
        {
            id: 5,
            title: "Hallmark Healthcare App",
            category: "Medical & EMR Systems",
            tech: ["AngularJS", "Axios", "Sass"],
            desc: "A comprehensive Electronic Medical Record (EMR) portal connecting practitioners with clinics to streamline visits.",
            keyFeatures: [
                "Patient records grid with search autocomplete features.",
                "Interactive clinic schedule grids with drag-and-drop availability.",
                "Strict grid accessibility layouts rendering on tablet screens."
            ],
            mockupColor: "#f0fdfa"
        },
        {
            id: 6,
            title: "UAE E-Commerce Platform",
            category: "E-Commerce Marketplace",
            tech: ["ReactJS", "Context API", "Sass"],
            desc: "A high-traffic e-commerce shopping experience catering to Middle Eastern wholesale and retail electronics customers.",
            keyFeatures: [
                "Multi-criteria filter sidebar allowing instant catalog narrow-down.",
                "Checkout system with automated billing invoice integrations.",
                "Product gallery layout featuring magnification zooms."
            ],
            mockupColor: "#fdf2f8"
        }
    ];

    const skillSet = [
        { name: "JavaScript (ES6+)", category: "frontend", percentage: 92 },
        { name: "TypeScript", category: "frontend", percentage: 85 },
        { name: "HTML5 & CSS3", category: "frontend", percentage: 95 },
        { name: "AngularJS (1.x)", category: "frameworks", percentage: 94 },
        { name: "ReactJS", category: "frameworks", percentage: 90 },
        { name: "REST API Integration", category: "api", percentage: 93 },
        { name: "Redux / Toolkit", category: "api", percentage: 86 },
        { name: "Context API", category: "api", percentage: 90 },
        { name: "Tailwind CSS", category: "styling", percentage: 90 },
        { name: "Sass / SCSS", category: "styling", percentage: 88 },
        { name: "Responsive UI Development", category: "styling", percentage: 96 },
        { name: "Git & Version Control", category: "tools", percentage: 88 }
    ];

    // Filtered skills computation
    const filteredSkills = skillsTab === 'all'
        ? skillSet
        : skillSet.filter(skill => {
            if (skillsTab === 'frontend') return skill.category === 'frontend';
            if (skillsTab === 'frameworks') return skill.category === 'frameworks';
            if (skillsTab === 'api') return skill.category === 'api';
            if (skillsTab === 'styling') return skill.category === 'styling';
            if (skillsTab === 'tools') return skill.category === 'tools';
            return true;
        });


    return (
        <>
            <div className="canvas-page">

                {/* ==========================================
                    HEADER NAVBAR
                    ========================================== */}
                <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                    <a href="#hero" className="logo">PROJECT <span className="logo-dot"></span></a>
                    <div className="nav-actions">
                        <button onClick={() => setShowMenuModal(true)} className="btn-circle" aria-label="Open navigation menu">
                            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 1H18M0 6H18M0 11H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* ==========================================
                    1. HERO SECTION
                    ========================================== */}
                <section id="hero" className="hero-container">
                    <div className="hero-info">
                        <h1 className="hero-headline">
                            <span className={`highlight-box ${getRandomColor('BRINGING PROJECTS')}`} style={{ transform: 'rotate(-2deg)', display: 'inline-block', marginBottom: '8px' }}>BRINGING PROJECTS</span><br />
                            TO LIFE IN THE<br />
                            <span className="highlight-box bg-blue" style={{ transform: 'rotate(1deg)', display: 'inline-block', marginTop: '8px' }}>DIGITAL WORLD</span>
                        </h1>
                        <p className="hero-tagline">
                            Hi, I'm <span style={{ fontWeight: 'bold' }}>Project</span>, an <strong>AngularJS & Frontend Developer</strong> based in Chennai. I craft modern, responsive Single Page Applications and help teams transition legacy frontends to ReactJS ecosystems.
                        </p>

                        <div className="hero-ctas">
                            <a href={scvPdf} download="SCV.pdf" className="btn-outline">Download SCV</a>
                        </div>

                        <div>
                            <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
                                Core Stack Competency:
                            </span>
                            <div className="badge-container">
                                <span className={`badge ${getRandomColor('AngularJS')}`}>AngularJS</span>
                                <span className={`badge ${getRandomColor('ReactJS')}`}>ReactJS</span>
                                <span className={`badge ${getRandomColor('TypeScript')}`}>TypeScript</span>
                                <span className={`badge ${getRandomColor('JavaScript')}`}>JavaScript</span>
                                <span className={`badge ${getRandomColor('Tailwind CSS')}`}>Tailwind CSS</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="workspace-window">
                            <div className="workspace-header">
                                <div className="workspace-dots">
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block', marginRight: '4px' }} />
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block', marginRight: '4px' }} />
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                                </div>
                                <div className="workspace-title">project_profile.js</div>
                                <div style={{ width: '30px' }} />
                            </div>
                            <div className="workspace-body">
                                <span style={{ color: '#888' }}>// 4+ Years Commercial Coding</span><br />
                                <span style={{ color: '#00f' }}>const</span> <span style={{ color: '#d97706' }}>developer</span> = &#123;<br />
                                &nbsp;&nbsp;name: <span style={{ color: '#16a34a' }}>'Project'</span>,<br />
                                &nbsp;&nbsp;role: <span style={{ color: '#16a34a' }}>'AngularJS & ReactJS Engineer'</span>,<br />
                                &nbsp;&nbsp;experience: <span style={{ color: '#16a34a' }}>'4 Years'</span>,<br />
                                &nbsp;&nbsp;location: <span style={{ color: '#16a34a' }}>'Chennai, India'</span>,<br />
                                &nbsp;&nbsp;philosophies: &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;spa: <span style={{ color: '#16a34a' }}>'Accessible SPAs'</span>,<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;responsive: <span style={{ color: '#16a34a' }}>'Pixel-perfect grids'</span><br />
                                &nbsp;&nbsp;&#125;<br />
                                &#125;;
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    2. ABOUT SECTION
                    ========================================== */}
                <section id="about" className="section-wrapper">
                    <span className="section-label">Aesthetic & Detail</span>
                    <h2 className="section-title"><span className={`highlight-box ${getRandomColor('PROFESSIONAL')}`} style={{ transform: 'rotate(-1deg)' }}>PROFESSIONAL</span> SUMMARY</h2>
                    <p className="section-subtitle">A results-oriented Frontend Developer with 4 years of hands-on expertise building enterprise-level Single Page Applications.</p>

                    <div className="about-grid">
                        <div className="about-stats">
                            <div className="stat-card">
                                <span className="stat-number">4+</span>
                                <span className="stat-label">Years Exp</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Responsive</span>
                            </div>
                            <div className="stat-card" style={{ gridColumn: 'span 2' }}>
                                <span className="stat-label">Industries Worked</span>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                                    <span className={`badge ${getRandomColor('Healthcare')}`}>Healthcare</span>
                                    <span className={`badge ${getRandomColor('IT Services')}`}>IT Services</span>
                                    <span className={`badge ${getRandomColor('E-Commerce')}`}>E-Commerce</span>
                                </div>
                            </div>
                        </div>

                        <div className="about-details">
                            <p className="about-text">
                                Based in Chennai, India, my experience spans building diagnostic booking engines, finance administration dashboards, and consumer-facing retail networks. I have a proven record of enhancing loading speeds, refactoring legacy spaghetti structures into clean components, and designing accessible, recruiter-approved responsive UIs.
                            </p>

                            <div className="strengths-grid">
                                <div className="strength-item">
                                    <h3 className="strength-title">Responsive UI Development</h3>
                                    <p className="strength-desc">Expert at CSS Grid/Flexbox layouts that render flawless UI structures on phones, tablets, and wide monitors.</p>
                                </div>
                                <div className="strength-item">
                                    <h3 className="strength-title">REST API Integration</h3>
                                    <p className="strength-desc">Seamlessly wiring server endpoints using Axios/Fetch APIs, managing complicated async loads and secure validations.</p>
                                </div>
                                <div className="strength-item">
                                    <h3 className="strength-title">SPA Development</h3>
                                    <p className="strength-desc">Developing highly responsive, seamless user journeys with robust routing architectures (React Router/Angular Route).</p>
                                </div>
                                <div className="strength-item">
                                    <h3 className="strength-title">Performance Optimization</h3>
                                    <p className="strength-desc">Optimizing Core Web Vitals, image assets, asset bundling, and code splitting for rapid page loads.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    3. EXPERIENCE TIMELINE SECTION
                    ========================================== */}
                <section id="experience" className="section-wrapper">
                    <span className="section-label">Interactive Path</span>
                    <h2 className="section-title"><span className={`highlight-box ${getRandomColor('JOURNEY')}`} style={{ transform: 'rotate(1deg)' }}>PROFESSIONAL</span> JOURNEY</h2>
                    <p className="section-subtitle">Click "View Contributions" on any role to expand and inspect specific technological contributions, project architectures, and metrics achieved.</p>

                    <div className="timeline-container">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="timeline-item">
                                <div className="timeline-dot" />
                                <div className="timeline-card">
                                    <div className="timeline-header">
                                        <div>
                                            <h3 className="timeline-role">{exp.role}</h3>
                                            <span className="timeline-company">
                                                <span className="timeline-company-logo">C</span>
                                                <span>{exp.company}</span>
                                            </span>
                                        </div>
                                        <span className="timeline-duration">{exp.duration}</span>
                                    </div>

                                    <p className="timeline-summary">{exp.summary}</p>

                                    <button
                                        onClick={() => setExpandedExperience(expandedExperience === exp.id ? null : exp.id)}
                                        className="timeline-expand-btn"
                                        aria-expanded={expandedExperience === exp.id}
                                    >
                                        <span>{expandedExperience === exp.id ? "Hide Achievements" : "View Achievements"}</span>
                                        {expandedExperience === exp.id ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                                    </button>

                                    {expandedExperience === exp.id && (
                                        <div className="timeline-expanded">
                                            <ul className="contribution-list">
                                                {exp.achievements.map((ach, idx) => (
                                                    <li key={idx}>{ach}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ==========================================
                    4. PROJECTS SECTION
                    ========================================== */}
                <section id="projects" className="section-wrapper">
                    <span className="section-label">Engineering Showcases</span>
                    <h2 className="section-title"><span className={`highlight-box ${getRandomColor('DEVELOPER')}`} style={{ transform: 'rotate(-1deg)' }}>DEVELOPER</span> PORTFOLIOS</h2>
                    <p className="section-subtitle">A selection of premium commercial platforms and systems built focusing on robust routing, heavy data visualization, and accessibility.</p>

                    <div className="projects-grid">
                        {projects.map((proj) => (
                            <div key={proj.id} className="project-card">

                                {/* CSS-based custom mockup thumbnail */}
                                <div className="project-thumbnail" style={{ backgroundColor: proj.mockupColor }}>
                                    <div style={{ border: '1.5px solid var(--color-border)', borderRadius: '10px', background: '#fff', padding: '16px', width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#eee', border: '1px solid #111' }} />
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#eee', border: '1px solid #111' }} />
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: '800', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>{proj.category}</span>
                                        <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>&lt;Code Showcase /&gt;</span>
                                    </div>
                                </div>

                                <div className="project-info">
                                    <h3 className="project-title">{proj.title}</h3>
                                    <p className="project-desc">{proj.desc}</p>

                                    <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px', display: 'block' }}>Key Features:</span>
                                    <ul className="project-features-list">
                                        {proj.keyFeatures.map((feat, idx) => (
                                            <li key={idx}>{feat}</li>
                                        ))}
                                    </ul>

                                    <div className="badge-container" style={{ marginBottom: '0px' }}>
                                        {proj.tech.map((t, idx) => (
                                            <span key={idx} className={`badge ${getRandomColor(t)}`}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ==========================================
                    5. SKILLS SECTION
                    ========================================== */}
                <section id="skills" className="section-wrapper">
                    <span className="section-label">Competency Matrix</span>
                    <h2 className="section-title"><span className={`highlight-box ${getRandomColor('TECH STACK')}`} style={{ transform: 'rotate(1deg)' }}>TECH STACK</span> & COMPETENCY</h2>
                    <p className="section-subtitle">Select filters below to narrow down skills. Progress bars represent experience validated in production environments.</p>

                    <div className="skills-tab-row">
                        <button onClick={() => setSkillsTab('all')} className={`skills-tab-btn ${skillsTab === 'all' ? 'active' : ''}`}>All Skills</button>
                        <button onClick={() => setSkillsTab('frontend')} className={`skills-tab-btn ${skillsTab === 'frontend' ? 'active' : ''}`}>Frontend</button>
                        <button onClick={() => setSkillsTab('frameworks')} className={`skills-tab-btn ${skillsTab === 'frameworks' ? 'active' : ''}`}>Frameworks</button>
                        <button onClick={() => setSkillsTab('api')} className={`skills-tab-btn ${skillsTab === 'api' ? 'active' : ''}`}>State & API</button>
                        <button onClick={() => setSkillsTab('styling')} className={`skills-tab-btn ${skillsTab === 'styling' ? 'active' : ''}`}>UI Styling</button>
                        <button onClick={() => setSkillsTab('tools')} className={`skills-tab-btn ${skillsTab === 'tools' ? 'active' : ''}`}>Tools</button>
                    </div>

                    <div className="skills-grid">
                        {filteredSkills.map((skill, idx) => (
                            <div key={idx} className="skill-bar-wrapper">
                                <div className="skill-bar-header">
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-pct">{skill.percentage}%</span>
                                </div>
                                <div className="skill-progress-track">
                                    <div
                                        className="skill-progress-bar"
                                        style={{ width: `${skill.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ==========================================
                    6. CREDENTIALS SECTION (ACHIEVEMENTS & EDUCATION)
                    ========================================== */}
                <section id="credentials" className="section-wrapper">
                    <span className="section-label">Badges & Degrees</span>

                    <div className="credentials-layout">
                        {/* Achievements */}
                        <div className="credential-card">
                            <div className="award-badge-container">
                                <Icons.Award />
                            </div>
                            <h3 className="credential-headline">Outstanding Performance & Lasting Contribution</h3>
                            <span className="credential-org">Colan Infotech — 2024</span>
                            <p className="credential-text">
                                Recognized in 2024 for exceptional support in executing critical legacy AngularJS code migration paths and managing client checkout SPA modules without down-times.
                            </p>
                        </div>

                        {/* Education */}
                        <div className="credential-card">
                            <div className="award-badge-container">
                                <Icons.BookOpen />
                            </div>
                            <h3 className="credential-headline">Bachelor of Computer Applications (73%)</h3>
                            <span className="credential-org">M.M.E.S Women's Arts & Science College, Melvisharam | 2018</span>
                            <p className="credential-text">
                                Focused on core programming methodologies, software system design paradigms, and frontend accessibility technologies.
                            </p>
                            <div className="edu-meta-row">
                                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>Graduated: 2018</span>
                                <span className="edu-grade-badge">73%</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    7. CTA SECTION (Adopted UI)
                    ========================================== */}
                <section id="cta" className="cta-section">
                    <div className="cta-triangle"></div>

                    {/* Floating Social Icons */}
                    <div className="social-icons-container">
                        <div className="social-icon icon-react"><Icons.React /></div>
                        <div className="social-icon icon-html5"><Icons.Html5 /></div>
                        <div className="social-icon icon-css3"><Icons.Css3 /></div>
                        <div className="social-icon icon-js"><Icons.Js /></div>
                        <div className="social-icon icon-bootstrap"><Icons.Bootstrap /></div>
                        <div className="social-icon icon-restapi"><Icons.RestApi /></div>
                    </div>

                    <div className="cta-content">
                        <div className="cta-badge">GET IN TOUCH <span className="cta-badge-dot"></span></div>
                        <h2 className="cta-heading">LET US HELP YOU</h2>

                        <div className="cta-highlights">
                            <span className={`highlight-box ${getRandomColor('GROW YOUR MMR')}`}>GROW YOUR MMR</span>
                            <span className={`highlight-box ${getRandomColor('EXPAND YOUR REACH')}`}>EXPAND YOUR REACH</span>
                            <span className={`highlight-box ${getRandomColor('THRIVE ONLINE')}`}>THRIVE ONLINE</span>
                        </div>

                        <p className="cta-description">
                            We've helped COUNTLESS brands shine online. Now it's YOUR turn! Take the first step by booking a discovery call with us.
                            <br /><br />
                            We CAN'T WAIT to meet you!!!
                        </p>
                    </div>
                </section>

            </div>


            {/* ==========================================
                MODAL: NAVIGATION MENU SIDEBAR (MOBILE)
                ========================================== */}
            {showMenuModal && (
                <div className="talk-modal-overlay" onClick={() => setShowMenuModal(false)}>
                    <div className="menu-modal-card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowMenuModal(false)} className="close-btn" aria-label="Close menu">
                            ✕
                        </button>
                        <ul className="menu-list">
                            <li><a href="#hero" onClick={() => setShowMenuModal(false)} className="menu-link">Home</a></li>
                            <li><a href="#about" onClick={() => setShowMenuModal(false)} className="menu-link">About</a></li>
                            <li><a href="#experience" onClick={() => setShowMenuModal(false)} className="menu-link">Experience</a></li>
                            <li><a href="#projects" onClick={() => setShowMenuModal(false)} className="menu-link">Projects</a></li>
                            <li><a href="#skills" onClick={() => setShowMenuModal(false)} className="menu-link">Skills</a></li>
                            <li><a href="#credentials" onClick={() => setShowMenuModal(false)} className="menu-link">Credentials</a></li>
                        </ul>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border-light)', paddingTop: '20px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                            <span>Chennai, India</span><br />
                            <span>Senior AngularJS & ReactJS Specialist</span>
                        </div>
                    </div>
                </div>
            )}

            {isCursorHovered && (
                <>
                    <div
                        className={`custom-cursor-ring ${isLinkHovered ? 'hovered' : ''}`}
                        style={{
                            left: `${mousePos.x}px`,
                            top: `${mousePos.y}px`
                        }}
                    />
                    <div
                        className={`custom-cursor-dot ${isLinkHovered ? 'hovered' : ''}`}
                        style={{
                            left: `${mousePos.x}px`,
                            top: `${mousePos.y}px`
                        }}
                    />
                </>
            )}
        </>
    );
}
