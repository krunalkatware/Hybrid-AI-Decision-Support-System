/* ═══════════════════════════════════════════════════════════════
   HYBRID AI CAREER DECISION SUPPORT SYSTEM — SCRIPT
   Combines Rule-Based Logic + ML-Style Prediction Engine
   ═══════════════════════════════════════════════════════════════ */

// ─── STATE ───
let currentStep = 1;
const totalSteps = 4;
let selectedSkills = [];
let chartInstances = {};
let currentAnalysisData = null;
let currentAnalysisResults = null;

// ─── SKILL DEFINITIONS ───
const allSkills = [
    { name: 'Python', icon: '🐍', category: 'language' },
    { name: 'Java', icon: '☕', category: 'language' },
    { name: 'JavaScript', icon: '⚡', category: 'language' },
    { name: 'C++', icon: '⚙️', category: 'language' },
    { name: 'C#', icon: '🔷', category: 'language' },
    { name: 'R', icon: '📊', category: 'language' },
    { name: 'SQL', icon: '🗄️', category: 'database' },
    { name: 'MongoDB', icon: '🍃', category: 'database' },
    { name: 'React', icon: '⚛️', category: 'framework' },
    { name: 'Node.js', icon: '🟢', category: 'framework' },
    { name: 'Django', icon: '🎸', category: 'framework' },
    { name: 'Flask', icon: '🧪', category: 'framework' },
    { name: 'TensorFlow', icon: '🧠', category: 'aiml' },
    { name: 'PyTorch', icon: '🔥', category: 'aiml' },
    { name: 'Scikit-Learn', icon: '📈', category: 'aiml' },
    { name: 'Docker', icon: '🐳', category: 'devops' },
    { name: 'AWS', icon: '☁️', category: 'cloud' },
    { name: 'Git', icon: '📦', category: 'tool' },
    { name: 'Linux', icon: '🐧', category: 'tool' },
    { name: 'HTML/CSS', icon: '🎨', category: 'web' },
    { name: 'TypeScript', icon: '🔷', category: 'language' },
    { name: 'Kotlin', icon: '🟣', category: 'language' },
    { name: 'Swift', icon: '🍎', category: 'language' },
    { name: 'Flutter', icon: '💙', category: 'framework' },
    { name: 'Kubernetes', icon: '☸️', category: 'devops' },
    { name: 'Pandas', icon: '🐼', category: 'aiml' },
    { name: 'NumPy', icon: '🔢', category: 'aiml' },
    { name: 'Tableau', icon: '📉', category: 'tool' },
    { name: 'Power BI', icon: '📊', category: 'tool' },
    { name: 'Figma', icon: '🎨', category: 'tool' },
];

// ─── CAREER DATABASE ───
const careerDatabase = {
    'Full-Stack Web Developer': {
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'MongoDB', 'Git', 'TypeScript'],
        relatedInterests: ['web'],
        minCGPA: 6.0,
        icon: '🌐',
        color: '#6c5ce7',
        description: 'Build complete web applications from frontend to backend.'
    },
    'AI/ML Engineer': {
        requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'R'],
        relatedInterests: ['aiml'],
        minCGPA: 7.0,
        icon: '🤖',
        color: '#00cec9',
        description: 'Design and deploy machine learning models and AI systems.'
    },
    'Data Scientist': {
        requiredSkills: ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'Tableau', 'Power BI'],
        relatedInterests: ['datascience'],
        minCGPA: 7.0,
        icon: '📊',
        color: '#fd79a8',
        description: 'Extract insights from data using statistical and ML techniques.'
    },
    'Cybersecurity Analyst': {
        requiredSkills: ['Python', 'Linux', 'C++', 'SQL', 'Git'],
        relatedInterests: ['cybersecurity'],
        minCGPA: 6.5,
        icon: '🔒',
        color: '#e17055',
        description: 'Protect systems and networks from cyber threats and attacks.'
    },
    'Cloud Solutions Architect': {
        requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Python', 'Git'],
        relatedInterests: ['cloud', 'devops'],
        minCGPA: 6.5,
        icon: '☁️',
        color: '#0984e3',
        description: 'Design and manage scalable cloud infrastructure.'
    },
    'Mobile App Developer': {
        requiredSkills: ['Kotlin', 'Swift', 'Flutter', 'JavaScript', 'React', 'Git'],
        relatedInterests: ['mobile'],
        minCGPA: 6.0,
        icon: '📱',
        color: '#00b894',
        description: 'Create native and cross-platform mobile applications.'
    },
    'DevOps Engineer': {
        requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Git', 'Python'],
        relatedInterests: ['devops', 'cloud'],
        minCGPA: 6.5,
        icon: '⚙️',
        color: '#fdcb6e',
        description: 'Automate and streamline software delivery and operations.'
    },
    'Blockchain Developer': {
        requiredSkills: ['JavaScript', 'Python', 'C++', 'Git'],
        relatedInterests: ['blockchain'],
        minCGPA: 7.0,
        icon: '🔗',
        color: '#a29bfe',
        description: 'Build decentralized applications and smart contracts.'
    },
    'Game Developer': {
        requiredSkills: ['C++', 'C#', 'Python', 'JavaScript', 'Git'],
        relatedInterests: ['gamedev'],
        minCGPA: 6.0,
        icon: '🎮',
        color: '#e84393',
        description: 'Design and develop interactive games for various platforms.'
    },
    'IoT Engineer': {
        requiredSkills: ['Python', 'C++', 'Linux', 'AWS', 'Git'],
        relatedInterests: ['iot'],
        minCGPA: 6.5,
        icon: '📡',
        color: '#00cec9',
        description: 'Connect physical devices with intelligent software systems.'
    }
};

// ═══════════════ INITIALIZATION ═══════════════
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initParticles();
    initSkillsGrid();
    initInterestCards();
    initInternshipToggle();
    initTooltips();
    initRippleEffects();
    initNavigation();
    initMobileSidebar();
    initActionButtons();
    lucide.createIcons();
});

// ─── THEME SYSTEM ───
function initTheme() {
    const savedTheme = localStorage.getItem('ai-career-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ai-career-theme', newTheme);

    // Re-init particles for new theme
    initParticles();
}

// ─── PARTICLE BACKGROUND ───
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const alpha = isDark ? 0.4 : 0.25;
    const lineAlpha = isDark ? 0.1 : 0.06;
    const colors = [
        `rgba(124, 58, 237, ${alpha})`,   // purple
        `rgba(34, 211, 238, ${alpha})`,    // cyan
        `rgba(244, 114, 182, ${alpha})`,   // pink
        `rgba(251, 146, 60, ${alpha})`,    // orange
        `rgba(52, 211, 153, ${alpha})`     // green
    ];
    const lineColors = [
        `rgba(124, 58, 237, ${lineAlpha})`,
        `rgba(34, 211, 238, ${lineAlpha})`,
        `rgba(244, 114, 182, ${lineAlpha})`
    ];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    if (window._particleAnimId) cancelAnimationFrame(window._particleAnimId);
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = lineColors[(i + j) % lineColors.length];
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        window._particleAnimId = requestAnimationFrame(animate);
    }
    animate();
}

// ─── SKILLS GRID ───
function initSkillsGrid() {
    const grid = document.getElementById('skillsGrid');
    grid.innerHTML = '';
    allSkills.forEach(skill => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.dataset.skill = skill.name;
        tag.innerHTML = `<span>${skill.icon}</span><span>${skill.name}</span>`;
        tag.addEventListener('click', () => toggleSkill(tag, skill.name));
        grid.appendChild(tag);
    });
}

function toggleSkill(el, name) {
    el.classList.toggle('selected');
    if (selectedSkills.includes(name)) {
        selectedSkills = selectedSkills.filter(s => s !== name);
    } else {
        selectedSkills.push(name);
    }
    document.getElementById('skillCount').textContent = `${selectedSkills.length} selected`;
    // Haptic-like feedback (visual bounce)
    el.style.transform = 'scale(0.95)';
    setTimeout(() => { el.style.transform = ''; }, 150);
}

// ─── INTEREST CARDS ───
function initInterestCards() {
    const cards = document.querySelectorAll('.interest-card');
    const select = document.getElementById('interest');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            select.value = card.dataset.value;
        });
    });

    select.addEventListener('change', () => {
        cards.forEach(c => {
            c.classList.toggle('selected', c.dataset.value === select.value);
        });
    });
}

// ─── INTERNSHIP TOGGLE ───
function initInternshipToggle() {
    const checkbox = document.getElementById('hasInternship');
    const detail = document.getElementById('internshipDetail');
    checkbox.addEventListener('change', () => {
        detail.classList.toggle('hidden', !checkbox.checked);
    });
}

// ─── TOOLTIPS ───
function initTooltips() {
    const tooltip = document.getElementById('tooltip');
    document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            tooltip.textContent = trigger.dataset.tooltip;
            tooltip.classList.add('visible');
            const rect = trigger.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.bottom + 8) + 'px';
        });
        trigger.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
}

// ─── RIPPLE EFFECTS ───
function initRippleEffects() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-neon');
        if (!btn) return;
        const ripple = btn.querySelector('.btn-ripple');
        if (!ripple) return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        ripple.style.animation = 'none';
        void ripple.offsetWidth;
        ripple.style.animation = 'ripple 0.6s ease-out';
    });
}

// ─── NAVIGATION ───
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
            closeMobileSidebar();
        });
    });
}

function showSection(name) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-section="${name}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Update sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('section-active'));

    const titles = {
        input: 'Career Input',
        dashboard: 'Results Dashboard',
        analysis: 'Detailed Analysis',
        about: 'About System'
    };

    const icons = {
        input: 'sparkles',
        dashboard: 'layout-dashboard',
        analysis: 'bar-chart-3',
        about: 'info'
    };

    // Determine which section to show
    let sectionId;
    if (name === 'input') sectionId = 'sectionInput';
    else if (name === 'dashboard') sectionId = 'sectionDashboard';
    else if (name === 'analysis') sectionId = 'sectionAnalysis';
    else if (name === 'about') sectionId = 'sectionAbout';

    const section = document.getElementById(sectionId);
    if (section) section.classList.add('section-active');

    // Update page title
    const titleEl = document.getElementById('pageTitle');
    titleEl.innerHTML = `<i data-lucide="${icons[name] || 'sparkles'}"></i>${titles[name] || 'Career Input'}`;
    lucide.createIcons();
}

// ─── MOBILE SIDEBAR ───
function initMobileSidebar() {
    document.getElementById('hamburger').addEventListener('click', () => {
        document.getElementById('sidebar').classList.add('open');
        document.getElementById('sidebarOverlay').classList.add('active');
    });

    document.getElementById('sidebarOverlay').addEventListener('click', closeMobileSidebar);
}

function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// ═══════════════ FORM STEP NAVIGATION ═══════════════
function nextStep(current) {
    if (!validateStep(current)) return;

    const currentEl = document.getElementById(`step${current}`);
    currentEl.classList.remove('active');
    document.querySelector(`.progress-step[data-step="${current}"]`).classList.add('completed');
    document.querySelector(`.progress-step[data-step="${current}"]`).classList.remove('active');

    currentStep = current + 1;
    if (currentStep <= totalSteps) {
        const nextEl = document.getElementById(`step${currentStep}`);
        nextEl.classList.add('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
        document.getElementById('progressFill').style.width = `${(currentStep / totalSteps) * 100}%`;
    }

    lucide.createIcons();
}

function prevStep(current) {
    const currentEl = document.getElementById(`step${current}`);
    currentEl.classList.remove('active');
    document.querySelector(`.progress-step[data-step="${current}"]`).classList.remove('active');

    currentStep = current - 1;
    const prevEl = document.getElementById(`step${currentStep}`);
    prevEl.classList.add('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
    document.getElementById('progressFill').style.width = `${(currentStep / totalSteps) * 100}%`;

    lucide.createIcons();
}

function validateStep(step) {
    if (step === 1) {
        const sgpa = parseFloat(document.getElementById('sgpa').value);
        const cgpa = parseFloat(document.getElementById('cgpa').value);
        if (isNaN(sgpa) || sgpa < 0 || sgpa > 10) {
            shakeElement(document.getElementById('sgpa'));
            return false;
        }
        if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
            shakeElement(document.getElementById('cgpa'));
            return false;
        }
        return true;
    }
    if (step === 2) {
        if (!document.getElementById('interest').value) {
            shakeElement(document.getElementById('interest').closest('.select-wrapper') || document.getElementById('interest'));
            return false;
        }
        return true;
    }
    if (step === 3) {
        if (selectedSkills.length === 0) {
            const grid = document.getElementById('skillsGrid');
            shakeElement(grid);
            return false;
        }
        return true;
    }
    return true;
}

function shakeElement(el) {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'shake 0.5s ease';
    el.style.borderColor = '#e17055';
    setTimeout(() => {
        el.style.borderColor = '';
        el.style.animation = '';
    }, 1500);
}

// Add shake keyframes
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}`;
document.head.appendChild(shakeStyle);

// ═══════════════ CAREER ANALYSIS ENGINE ═══════════════
// Configuration: set to true to use Flask backend, false for client-side only
const USE_FLASK_API = true;
const API_BASE_URL = window.location.origin; // Auto-detect Flask server URL

function analyzeCareer() {
    // Collect all data
    const userData = collectUserData();

    if (USE_FLASK_API) {
        // Show loader, then call Flask API in background
        showLoaderWithAPI(userData);
    } else {
        // Client-side only analysis
        showLoader(userData);
    }
}

// ─── Flask API Integration ───
async function callFlaskAPI(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API request failed');
        }

        return await response.json();
    } catch (error) {
        console.warn('⚠️ Flask API unavailable, falling back to client-side analysis:', error.message);
        return null; // Will trigger fallback
    }
}

// ─── Loader with Flask API call ───
function showLoaderWithAPI(userData) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('section-active'));
    const loader = document.getElementById('sectionLoader');
    loader.classList.add('section-active');
    lucide.createIcons();

    const messages = [
        'Connecting to AI Server...',
        'Transmitting profile data to backend...',
        'Server: Applying rule-based decision trees...',
        'Server: Running weighted scoring algorithm...',
        'Server: Computing career suitability matrix...',
        'Server: Performing hybrid fusion analysis...',
        'Receiving AI predictions...',
        'Rendering personalized dashboard...',
        'Analysis complete!'
    ];

    const loaderSteps = ['ls1', 'ls2', 'ls3', 'ls4'];
    let msgIndex = 0;
    let stepIndex = 0;
    const loaderBar = document.getElementById('loaderBar');

    function typeMessage(msg) {
        const el = document.getElementById('loaderSubtext');
        el.textContent = '';
        let i = 0;
        function type() {
            if (i < msg.length) {
                el.textContent += msg[i];
                i++;
                setTimeout(type, 25);
            }
        }
        type();
    }

    typeMessage(messages[0]);

    const messageInterval = setInterval(() => {
        msgIndex++;
        if (msgIndex < messages.length) {
            typeMessage(messages[msgIndex]);
        }
    }, 700);

    const stepInterval = setInterval(() => {
        if (stepIndex < loaderSteps.length) {
            if (stepIndex > 0) document.getElementById(loaderSteps[stepIndex - 1]).classList.replace('active', 'done');
            document.getElementById(loaderSteps[stepIndex]).classList.add('active');
            stepIndex++;
        }
    }, 800);

    let progress = 0;
    const barInterval = setInterval(() => {
        progress += 2;
        if (progress <= 100) {
            loaderBar.style.width = progress + '%';
        }
    }, 60);

    // Call Flask API in the background while loader runs
    const apiPromise = callFlaskAPI(userData);

    // Wait for both loader animation and API response
    const minDelay = new Promise(resolve => setTimeout(resolve, 4200));

    Promise.all([apiPromise, minDelay]).then(([apiResult]) => {
        clearInterval(messageInterval);
        clearInterval(stepInterval);
        clearInterval(barInterval);

        loaderSteps.forEach(id => {
            const el = document.getElementById(id);
            el.classList.remove('active');
            el.classList.add('done');
        });
        loaderBar.style.width = '100%';

        setTimeout(() => {
            loaderSteps.forEach(id => {
                const el = document.getElementById(id);
                el.classList.remove('active', 'done');
            });
            loaderBar.style.width = '0%';

            let results;
            if (apiResult && apiResult.careers) {
                // ✅ Flask API response received
                console.log('✅ Using Flask backend analysis');
                results = apiResult;
            } else {
                // ⚠️ Fallback to client-side analysis
                console.log('⚠️ Using client-side fallback analysis');
                results = runHybridAnalysis(userData);
            }

            renderDashboard(userData, results);
        }, 600);
    });
}

function collectUserData() {
    return {
        sgpa: parseFloat(document.getElementById('sgpa').value),
        cgpa: parseFloat(document.getElementById('cgpa').value),
        interest: document.getElementById('interest').value,
        skills: [...selectedSkills],
        hasInternship: document.getElementById('hasInternship').checked,
        internshipDesc: document.getElementById('internshipDesc')?.value || '',
        projectCount: parseInt(document.getElementById('projectCount').value) || 0,
        projectDesc: document.getElementById('projectDesc')?.value || '',
        hackathons: parseInt(document.getElementById('hackathons').value) || 0,
        certifications: parseInt(document.getElementById('certifications').value) || 0
    };
}

// ─── LOADER ANIMATION ───
function showLoader(userData) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('section-active'));
    const loader = document.getElementById('sectionLoader');
    loader.classList.add('section-active');
    lucide.createIcons();

    const messages = [
        'Parsing user profile data...',
        'Evaluating academic performance...',
        'Mapping skill vectors to career domains...',
        'Applying rule-based decision trees...',
        'Running weighted scoring algorithm...',
        'Computing career suitability scores...',
        'Cross-referencing industry requirements...',
        'Generating personalized recommendations...',
        'Finalizing hybrid analysis...'
    ];

    const loaderSteps = ['ls1', 'ls2', 'ls3', 'ls4'];
    let msgIndex = 0;
    let stepIndex = 0;
    const loaderBar = document.getElementById('loaderBar');

    // Typing effect
    function typeMessage(msg) {
        const el = document.getElementById('loaderSubtext');
        el.textContent = '';
        let i = 0;
        function type() {
            if (i < msg.length) {
                el.textContent += msg[i];
                i++;
                setTimeout(type, 25);
            }
        }
        type();
    }

    typeMessage(messages[0]);

    const messageInterval = setInterval(() => {
        msgIndex++;
        if (msgIndex < messages.length) {
            typeMessage(messages[msgIndex]);
        }
    }, 700);

    // Progress steps
    const stepInterval = setInterval(() => {
        if (stepIndex < loaderSteps.length) {
            if (stepIndex > 0) document.getElementById(loaderSteps[stepIndex - 1]).classList.replace('active', 'done');
            document.getElementById(loaderSteps[stepIndex]).classList.add('active');
            stepIndex++;
        }
    }, 800);

    // Progress bar
    let progress = 0;
    const barInterval = setInterval(() => {
        progress += 2;
        if (progress <= 100) {
            loaderBar.style.width = progress + '%';
        }
    }, 60);

    // After loader, show results
    setTimeout(() => {
        clearInterval(messageInterval);
        clearInterval(stepInterval);
        clearInterval(barInterval);

        loaderSteps.forEach(id => {
            const el = document.getElementById(id);
            el.classList.remove('active');
            el.classList.add('done');
        });
        loaderBar.style.width = '100%';

        setTimeout(() => {
            // Reset loader state for next use
            loaderSteps.forEach(id => {
                const el = document.getElementById(id);
                el.classList.remove('active', 'done');
            });
            loaderBar.style.width = '0%';

            const results = runHybridAnalysis(userData);
            renderDashboard(userData, results);
        }, 600);
    }, 4200);
}

// ═══════════════ HYBRID AI ENGINE ═══════════════

function runHybridAnalysis(userData) {
    const ruleResults = ruleBasedAnalysis(userData);
    const predictionResults = intelligentPrediction(userData);
    const hybridScores = fuseResults(ruleResults, predictionResults);

    return {
        rules: ruleResults,
        predictions: predictionResults,
        careers: hybridScores,
        confidence: calculateConfidence(userData, hybridScores)
    };
}

// ─── RULE-BASED ANALYSIS (Deterministic Logic) ───
function ruleBasedAnalysis(userData) {
    const rules = [];
    const { sgpa, cgpa, skills, interest, hasInternship, projectCount, hackathons, certifications } = userData;
    const avgGPA = (sgpa + cgpa) / 2;

    // Academic rules
    if (avgGPA >= 8.5) {
        rules.push({ type: 'pass', text: `<strong>Excellent academic record</strong> (avg ${avgGPA.toFixed(1)}). Opens doors to top-tier research and competitive roles.` });
    } else if (avgGPA >= 7.0) {
        rules.push({ type: 'pass', text: `<strong>Good academic standing</strong> (avg ${avgGPA.toFixed(1)}). Qualifies for most industry roles and further studies.` });
    } else if (avgGPA >= 5.5) {
        rules.push({ type: 'warn', text: `<strong>Average academics</strong> (avg ${avgGPA.toFixed(1)}). Consider strengthening skills portfolio to compensate.` });
    } else {
        rules.push({ type: 'fail', text: `<strong>Below threshold academics</strong> (avg ${avgGPA.toFixed(1)}). Skills and projects become critical differentiators.` });
    }

    // SGPA vs CGPA trend
    if (sgpa > cgpa + 0.5) {
        rules.push({ type: 'pass', text: `<strong>Positive performance trend</strong> detected. Current SGPA exceeds CGPA by ${(sgpa - cgpa).toFixed(1)} points — shows growth.` });
    } else if (cgpa > sgpa + 0.5) {
        rules.push({ type: 'warn', text: `<strong>Performance dip detected</strong>. Current SGPA is lower by ${(cgpa - sgpa).toFixed(1)} — recent semester needs attention.` });
    }

    // Skill-Interest alignment
    const interestMap = {
        web: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'TypeScript'],
        aiml: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy'],
        datascience: ['Python', 'R', 'SQL', 'Pandas', 'Tableau', 'Power BI'],
        cybersecurity: ['Python', 'Linux', 'C++'],
        cloud: ['AWS', 'Docker', 'Kubernetes', 'Linux'],
        mobile: ['Kotlin', 'Swift', 'Flutter', 'React'],
        devops: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Git'],
        blockchain: ['JavaScript', 'Python', 'C++'],
        gamedev: ['C++', 'C#', 'Python'],
        iot: ['Python', 'C++', 'Linux', 'AWS']
    };

    const relevantSkills = interestMap[interest] || [];
    const matchedSkills = skills.filter(s => relevantSkills.includes(s));
    const matchRatio = relevantSkills.length > 0 ? matchedSkills.length / relevantSkills.length : 0;

    if (matchRatio >= 0.6) {
        rules.push({ type: 'pass', text: `<strong>Strong skill-interest alignment</strong> (${Math.round(matchRatio * 100)}%). Your skills match your chosen interest area well.` });
    } else if (matchRatio >= 0.3) {
        rules.push({ type: 'warn', text: `<strong>Partial skill-interest match</strong> (${Math.round(matchRatio * 100)}%). Consider adding: ${relevantSkills.filter(s => !skills.includes(s)).slice(0, 3).join(', ')}.` });
    } else {
        rules.push({ type: 'fail', text: `<strong>Low skill-interest alignment</strong> (${Math.round(matchRatio * 100)}%). Significant upskilling needed in: ${relevantSkills.filter(s => !skills.includes(s)).slice(0, 4).join(', ')}.` });
    }

    // Experience rules
    if (hasInternship && projectCount >= 3 && hackathons >= 1) {
        rules.push({ type: 'pass', text: `<strong>Strong practical profile</strong>. Industry internship + ${projectCount} projects + hackathon experience positions you well.` });
    } else if (hasInternship || projectCount >= 2) {
        rules.push({ type: 'warn', text: `<strong>Moderate experience</strong>. Consider gaining ${!hasInternship ? 'internship experience' : 'more hands-on projects'} for better prospects.` });
    } else {
        rules.push({ type: 'fail', text: `<strong>Limited practical exposure</strong>. Urgently build portfolio with projects, internships, and competitive coding.` });
    }

    if (certifications >= 3) {
        rules.push({ type: 'pass', text: `<strong>Well-certified</strong> with ${certifications} certifications. Demonstrates commitment to continuous learning.` });
    } else if (certifications >= 1) {
        rules.push({ type: 'warn', text: `<strong>${certifications} certification(s)</strong> earned. More recognized certifications can strengthen your profile.` });
    }

    return rules;
}

// ─── INTELLIGENT PREDICTION (ML-Style Weighted Scoring) ───
function intelligentPrediction(userData) {
    const { sgpa, cgpa, skills, interest, hasInternship, projectCount, hackathons, certifications } = userData;
    const avgGPA = (sgpa + cgpa) / 2;

    const careerScores = {};

    for (const [career, info] of Object.entries(careerDatabase)) {
        let score = 0;
        const weights = {
            skillMatch: 35,
            interestMatch: 25,
            academic: 20,
            experience: 20
        };

        // 1. Skill match score (0-35)
        const matched = skills.filter(s => info.requiredSkills.includes(s)).length;
        const skillScore = info.requiredSkills.length > 0
            ? (matched / info.requiredSkills.length) * weights.skillMatch
            : 0;
        score += skillScore;

        // 2. Interest match (0-25)
        if (info.relatedInterests.includes(interest)) {
            score += weights.interestMatch;
        } else {
            // Partial score for related areas
            score += weights.interestMatch * 0.15;
        }

        // 3. Academic suitability (0-20)
        if (avgGPA >= info.minCGPA) {
            const academicScore = Math.min((avgGPA / 10) * weights.academic, weights.academic);
            score += academicScore;
        } else {
            score += (avgGPA / info.minCGPA) * weights.academic * 0.7;
        }

        // 4. Experience boost (0-20)
        let expScore = 0;
        if (hasInternship) expScore += 7;
        expScore += Math.min(projectCount * 2, 6);
        expScore += Math.min(hackathons * 1.5, 4);
        expScore += Math.min(certifications * 1, 3);
        score += Math.min(expScore, weights.experience);

        // Normalize to 0-100
        careerScores[career] = Math.round(Math.min(score, 100));
    }

    return careerScores;
}

// ─── HYBRID FUSION ───
function fuseResults(ruleResults, predictionScores) {
    // Sort by prediction score
    const sorted = Object.entries(predictionScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Apply rule-based boost/penalty
    const passCount = ruleResults.filter(r => r.type === 'pass').length;
    const warnCount = ruleResults.filter(r => r.type === 'warn').length;
    const failCount = ruleResults.filter(r => r.type === 'fail').length;

    const ruleModifier = (passCount * 3) - (warnCount * 1) - (failCount * 3);

    return sorted.map(([career, score], index) => {
        let adjustedScore = score + ruleModifier;
        // First result gets a slight boost from hybrid fusion
        if (index === 0) adjustedScore += 5;
        adjustedScore = Math.max(10, Math.min(98, adjustedScore));
        return {
            name: career,
            score: adjustedScore,
            info: careerDatabase[career]
        };
    }).sort((a, b) => b.score - a.score);
}

function calculateConfidence(userData, careers) {
    let confidence = 50; // base

    // More skills = more data = higher confidence
    confidence += Math.min(userData.skills.length * 2, 15);

    // Clear interest = higher confidence
    if (userData.interest) confidence += 10;

    // Experience depth
    if (userData.hasInternship) confidence += 5;
    confidence += Math.min(userData.projectCount * 2, 8);
    confidence += Math.min(userData.hackathons, 4);
    confidence += Math.min(userData.certifications, 3);

    // Higher top score = higher confidence
    if (careers.length > 0) {
        const topScore = careers[0].score;
        const secondScore = careers.length > 1 ? careers[1].score : 0;
        // Larger gap between 1st and 2nd = more definitive
        confidence += Math.min((topScore - secondScore) * 0.5, 10);
    }

    return Math.max(40, Math.min(95, Math.round(confidence)));
}

// ═══════════════ RENDER DASHBOARD ═══════════════

function renderDashboard(userData, results) {
    // Switch sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('section-active'));
    document.getElementById('sectionDashboard').classList.add('section-active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('navDashboard').classList.add('active');

    // Update title
    document.getElementById('pageTitle').innerHTML = '<i data-lucide="layout-dashboard"></i>Results Dashboard';

    renderProfileSummary(userData);
    renderRuleResults(results.rules);
    renderAIResults(results);
    renderConfidenceMeter(results.confidence);
    renderBarChart(results.careers);
    renderPieChart(userData);
    renderCareerOptions(results.careers);

    // Save to state
    currentAnalysisData = userData;
    currentAnalysisResults = results;
    generateDetailedAnalysis(userData, results);

    lucide.createIcons();
}

function renderProfileSummary(data) {
    const interestLabels = {
        web: 'Web Development', aiml: 'AI / Machine Learning', datascience: 'Data Science',
        cybersecurity: 'Cybersecurity', cloud: 'Cloud Computing', mobile: 'Mobile Dev',
        devops: 'DevOps', blockchain: 'Blockchain', gamedev: 'Game Dev', iot: 'IoT'
    };

    document.getElementById('profileStats').innerHTML = `
        <div class="stat-item">
            <div class="stat-icon gradient-bg-1"><i data-lucide="trending-up"></i></div>
            <div class="stat-info">
                <div class="stat-label">SGPA</div>
                <div class="stat-value">${data.sgpa.toFixed(2)}</div>
            </div>
        </div>
        <div class="stat-item">
            <div class="stat-icon gradient-bg-2"><i data-lucide="award"></i></div>
            <div class="stat-info">
                <div class="stat-label">CGPA</div>
                <div class="stat-value">${data.cgpa.toFixed(2)}</div>
            </div>
        </div>
        <div class="stat-item">
            <div class="stat-icon gradient-bg-3"><i data-lucide="target"></i></div>
            <div class="stat-info">
                <div class="stat-label">Interest</div>
                <div class="stat-value">${interestLabels[data.interest] || data.interest}</div>
            </div>
        </div>
        <div class="stat-item">
            <div class="stat-icon gradient-bg-4"><i data-lucide="code-2"></i></div>
            <div class="stat-info">
                <div class="stat-label">Skills</div>
                <div class="stat-value">${data.skills.length} Selected</div>
            </div>
        </div>
        <div class="stat-item">
            <div class="stat-icon gradient-bg-1"><i data-lucide="briefcase"></i></div>
            <div class="stat-info">
                <div class="stat-label">Internship</div>
                <div class="stat-value">${data.hasInternship ? 'Yes ✅' : 'No'}</div>
            </div>
        </div>
        <div class="stat-item">
            <div class="stat-icon gradient-bg-2"><i data-lucide="folder-code"></i></div>
            <div class="stat-info">
                <div class="stat-label">Projects</div>
                <div class="stat-value">${data.projectCount}</div>
            </div>
        </div>
        <div class="stat-item">
            <div class="stat-icon gradient-bg-3"><i data-lucide="trophy"></i></div>
            <div class="stat-info">
                <div class="stat-label">Hackathons</div>
                <div class="stat-value">${data.hackathons}</div>
            </div>
        </div>
        <div class="stat-item">
            <div class="stat-icon gradient-bg-4"><i data-lucide="badge-check"></i></div>
            <div class="stat-info">
                <div class="stat-label">Certifications</div>
                <div class="stat-value">${data.certifications}</div>
            </div>
        </div>
    `;
}

function renderRuleResults(rules) {
    const icons = { pass: '✅', warn: '⚠️', fail: '❌' };
    document.getElementById('ruleResults').innerHTML = rules.map(r => `
        <div class="rule-item">
            <div class="rule-icon ${r.type}">${icons[r.type]}</div>
            <div class="rule-text">${r.text}</div>
        </div>
    `).join('');
}

function renderAIResults(results) {
    const top3 = results.careers.slice(0, 3);
    const colors = ['#6c5ce7', '#00cec9', '#fd79a8'];
    document.getElementById('aiResults').innerHTML = `
        <div class="ai-insight">
            <strong>Prediction Model Output:</strong> Based on weighted feature analysis across ${Object.keys(careerDatabase).length} career paths, the system identified
            <strong>${top3[0].name}</strong> as the strongest match with a composite score of <strong>${top3[0].score}%</strong>.
        </div>
        ${top3.map((c, i) => `
            <div class="ai-insight">
                <strong>#${i + 1} ${c.info.icon} ${c.name}</strong> — Suitability: ${c.score}%
                <div class="ai-score-bar">
                    <div class="ai-score-fill" style="width: 0%; background: ${colors[i]};" data-width="${c.score}%"></div>
                </div>
            </div>
        `).join('')}
        <div class="ai-insight">
            The hybrid fusion combines <strong>rule-based transparency</strong> with <strong>ML-style adaptivity</strong> to produce these balanced recommendations.
        </div>
    `;

    // Animate score bars
    setTimeout(() => {
        document.querySelectorAll('.ai-score-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 300);
}

function renderConfidenceMeter(confidence) {
    const circumference = 2 * Math.PI * 85; // ~534
    const offset = circumference * (1 - confidence / 100);

    // Add SVG gradient if not exists
    const svg = document.querySelector('.meter-ring svg');
    if (!svg.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#7c3aed"/>
                <stop offset="50%" style="stop-color:#22d3ee"/>
                <stop offset="100%" style="stop-color:#f472b6"/>
            </linearGradient>
        `;
        svg.insertBefore(defs, svg.firstChild);
    }

    const fill = document.getElementById('meterFill');
    fill.style.stroke = 'url(#meterGradient)';

    setTimeout(() => {
        fill.style.strokeDashoffset = offset;
    }, 500);

    // Animated counter
    const valueEl = document.getElementById('meterValue');
    let current = 0;
    const step = Math.ceil(confidence / 40);
    const counter = setInterval(() => {
        current += step;
        if (current >= confidence) {
            current = confidence;
            clearInterval(counter);
        }
        valueEl.textContent = current + '%';
    }, 50);

    const labels = {
        high: 'High Confidence — Strong data signal',
        medium: 'Moderate Confidence — Consider adding more data',
        low: 'Low Confidence — Limited input data'
    };
    document.getElementById('meterLabel').textContent =
        confidence >= 75 ? labels.high : confidence >= 55 ? labels.medium : labels.low;
}

function renderBarChart(careers) {
    const ctx = document.getElementById('barChart').getContext('2d');
    if (chartInstances.bar) chartInstances.bar.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    chartInstances.bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: careers.map(c => c.name),
            datasets: [{
                label: 'Suitability Score (%)',
                data: careers.map(c => c.score),
                backgroundColor: [
                    'rgba(124, 58, 237, 0.75)',
                    'rgba(34, 211, 238, 0.75)',
                    'rgba(244, 114, 182, 0.75)',
                    'rgba(251, 146, 60, 0.75)',
                    'rgba(52, 211, 153, 0.75)'
                ],
                borderColor: [
                    '#7c3aed',
                    '#22d3ee',
                    '#f472b6',
                    '#fb923c',
                    '#34d399'
                ],
                borderWidth: 2,
                borderRadius: 10,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? '#1a1a3e' : '#fff',
                    titleColor: isDark ? '#f0f0ff' : '#1a1a2e',
                    bodyColor: isDark ? '#a0a0c0' : '#4a4a6a',
                    borderColor: isDark ? 'rgba(108, 92, 231, 0.3)' : 'rgba(108, 92, 231, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 10,
                    padding: 14,
                    displayColors: false,
                    titleFont: { family: 'Orbitron', weight: 'bold' },
                    callbacks: {
                        label: (ctx) => `Suitability: ${ctx.raw}%`
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: isDark ? '#606080' : '#8a8aaa',
                        font: { size: 10, family: 'Inter' },
                        maxRotation: 45,
                        minRotation: 30
                    },
                    grid: { display: false },
                    border: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: isDark ? '#606080' : '#8a8aaa',
                        font: { size: 11 },
                        stepSize: 20,
                        callback: v => v + '%'
                    },
                    grid: {
                        color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    border: { display: false }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

function renderPieChart(userData) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    if (chartInstances.pie) chartInstances.pie.destroy();

    // Categorize skills
    const categories = {
        'Languages': 0,
        'Frameworks': 0,
        'AI/ML': 0,
        'DevOps/Cloud': 0,
        'Tools': 0,
        'Web': 0,
        'Database': 0
    };

    const catMap = {
        language: 'Languages', framework: 'Frameworks', aiml: 'AI/ML',
        devops: 'DevOps/Cloud', cloud: 'DevOps/Cloud', tool: 'Tools',
        web: 'Web', database: 'Database'
    };

    userData.skills.forEach(skillName => {
        const skill = allSkills.find(s => s.name === skillName);
        if (skill && catMap[skill.category]) {
            categories[catMap[skill.category]]++;
        }
    });

    const filtered = Object.entries(categories).filter(([, v]) => v > 0);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    chartInstances.pie = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: filtered.map(([k]) => k),
            datasets: [{
                data: filtered.map(([, v]) => v),
                backgroundColor: [
                    'rgba(108, 92, 231, 0.8)',
                    'rgba(0, 206, 201, 0.8)',
                    'rgba(253, 121, 168, 0.8)',
                    'rgba(253, 203, 110, 0.8)',
                    'rgba(0, 184, 148, 0.8)',
                    'rgba(9, 132, 227, 0.8)',
                    'rgba(162, 155, 254, 0.8)'
                ],
                borderColor: isDark ? '#111128' : '#fff',
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: isDark ? '#a0a0c0' : '#4a4a6a',
                        font: { size: 12, family: 'Inter' },
                        padding: 16,
                        usePointStyle: true,
                        pointStyleWidth: 10
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1a1a3e' : '#fff',
                    titleColor: isDark ? '#f0f0ff' : '#1a1a2e',
                    bodyColor: isDark ? '#a0a0c0' : '#4a4a6a',
                    borderColor: isDark ? 'rgba(108, 92, 231, 0.3)' : 'rgba(108, 92, 231, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 10,
                    padding: 14,
                    titleFont: { family: 'Orbitron', weight: 'bold' }
                }
            },
            cutout: '55%',
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

function renderCareerOptions(careers) {
    const container = document.getElementById('careerOptions');
    container.innerHTML = careers.map((c, i) => {
        const gradients = [
            'linear-gradient(135deg, #6c5ce7, #00cec9)',
            'linear-gradient(135deg, #fd79a8, #6c5ce7)',
            'linear-gradient(135deg, #00cec9, #00b894)',
            'linear-gradient(135deg, #fdcb6e, #e17055)',
            'linear-gradient(135deg, #a29bfe, #6c5ce7)'
        ];
        return `
            <div class="career-option ${i === 0 ? 'best' : ''}" style="animation-delay: ${i * 0.1}s">
                <div class="career-name">${c.info.icon} ${c.name}</div>
                <div class="career-score">
                    <div class="career-score-bar">
                        <div class="career-score-fill" style="width: 0%; background: ${gradients[i]};" data-width="${c.score}%"></div>
                    </div>
                    <div class="career-score-value">${c.score}%</div>
                </div>
                <div class="career-desc">${c.info.description}</div>
            </div>
        `;
    }).join('');

    // Animate score bars
    setTimeout(() => {
        document.querySelectorAll('.career-score-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 500);
}

// ═══════════════ RESTART ═══════════════
function restartAnalysis() {
    // Reset form
    document.getElementById('sgpa').value = '';
    document.getElementById('cgpa').value = '';
    document.getElementById('interest').value = '';
    document.getElementById('hasInternship').checked = false;
    document.getElementById('internshipDetail').classList.add('hidden');
    document.getElementById('internshipDesc').value = '';
    document.getElementById('projectCount').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('hackathons').value = '';
    document.getElementById('certifications').value = '';

    // Reset skills
    selectedSkills = [];
    document.querySelectorAll('.skill-tag').forEach(t => t.classList.remove('selected'));
    document.getElementById('skillCount').textContent = '0 selected';

    // Reset interest cards
    document.querySelectorAll('.interest-card').forEach(c => c.classList.remove('selected'));

    // Reset steps
    currentStep = 1;
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step1').classList.add('active');
    document.querySelectorAll('.progress-step').forEach(s => {
        s.classList.remove('active', 'completed');
    });
    document.querySelector('.progress-step[data-step="1"]').classList.add('active');
    document.getElementById('progressFill').style.width = '25%';

    // Destroy charts
    if (chartInstances.bar) { chartInstances.bar.destroy(); chartInstances.bar = null; }
    if (chartInstances.pie) { chartInstances.pie.destroy(); chartInstances.pie = null; }

    // Show input section
    showSection('input');
    lucide.createIcons();
}

// ═══════════════ FLASK BACKEND STATUS ═══════════════
/*
 * ✅ Flask API Integration is ACTIVE.
 *
 * The analyzeCareer() function now calls the Flask backend at /api/analyze.
 * If the Flask server is unavailable, it automatically falls back to
 * client-side hybrid AI analysis.
 *
 * To run with Flask backend:
 *   1. pip install -r requirements.txt
 *   2. python app.py
 *   3. Open http://localhost:5000
 *
 * To run without Flask (standalone HTML):
 *   - Set USE_FLASK_API = false at the top of the analysis section
 *   - Open index.html directly in a browser
 *
 * API Endpoints:
 *   POST /api/analyze    — Main career analysis
 *   GET  /api/careers    — List all career paths
 *   GET  /api/skills     — List all recognized skills
 *   GET  /api/interests  — List all interest areas
 *   GET  /health         — System health check
 */

// ═══════════════ ACTION BUTTONS & UI LOGIC ═══════════════

function initActionButtons() {
    const btnView = document.getElementById('btnViewAnalysis');
    if(btnView) btnView.addEventListener('click', () => showSection('analysis'));

    const btnExport = document.getElementById('btnExportJson');
    if(btnExport) btnExport.addEventListener('click', exportJson);

    const btnPrint = document.getElementById('btnPrintReport');
    if(btnPrint) btnPrint.addEventListener('click', () => { window.print(); });

    const btnSave = document.getElementById('btnSaveReport');
    if(btnSave) btnSave.addEventListener('click', () => {
        if(currentAnalysisResults && currentAnalysisData) {
            saveToHistory(currentAnalysisData, currentAnalysisResults);
            showToast('Report saved to history!', 'success');
        }
    });

    const btnHistory = document.getElementById('btnHistory');
    if(btnHistory) btnHistory.addEventListener('click', openHistoryModal);

    const btnCloseHist = document.getElementById('historyModalClose');
    if(btnCloseHist) btnCloseHist.addEventListener('click', closeHistoryModal);

    const overlay = document.getElementById('historyModalOverlay');
    if(overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeHistoryModal();
    });

    const btnClearHist = document.getElementById('btnClearHistory');
    if(btnClearHist) btnClearHist.addEventListener('click', () => {
        localStorage.removeItem('ai-career-history');
        renderHistoryList();
        showToast('History cleared', 'info');
    });
}

function exportJson() {
    if (!currentAnalysisData || !currentAnalysisResults) {
        showToast('No analysis available to export', 'error');
        return;
    }
    const exportData = {
        userData: currentAnalysisData,
        analysis: currentAnalysisResults,
        timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_analysis_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Export successful!', 'success');
}

// ─── TOASTS ───
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-circle';

    toast.innerHTML = `
        <i data-lucide="${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ─── HISTORY ───
function saveToHistory(userData, results) {
    const history = JSON.parse(localStorage.getItem('ai-career-history') || '[]');
    const entry = {
        id: new Date().getTime(),
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        topCareer: results.careers[0].name,
        score: results.careers[0].score,
        data: userData
    };
    history.unshift(entry); // add to top
    if (history.length > 10) history.pop(); // keep last 10
    localStorage.setItem('ai-career-history', JSON.stringify(history));
}

function openHistoryModal() {
    renderHistoryList();
    const modal = document.getElementById('historyModalOverlay');
    if(modal) modal.classList.add('active');
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModalOverlay');
    if(modal) modal.classList.remove('active');
}

function renderHistoryList() {
    const list = document.getElementById('historyList');
    if (!list) return;
    
    const history = JSON.parse(localStorage.getItem('ai-career-history') || '[]');
    if (history.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">No saved reports yet.</p>';
        return;
    }
    
    list.innerHTML = history.map(h => `
        <div class="history-item glass-card" style="margin-bottom:10px; padding:15px; border-radius:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <strong style="color:var(--text);">${h.topCareer}</strong>
                <span class="badge" style="background:var(--accent-purple); color:#fff; padding:2px 8px; border-radius:12px; font-size:0.8rem;">${h.score}% Match</span>
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted);">
                <i data-lucide="clock" style="height:12px; width:12px; margin-right:4px;"></i>${h.date}
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// ─── DETAILED ANALYSIS GENERATOR ───
function generateDetailedAnalysis(userData, results) {
    const emptyState = document.getElementById('analysisEmpty');
    const content = document.getElementById('analysisContent');
    if (!emptyState || !content) return;
    
    emptyState.classList.add('hidden');
    content.classList.remove('hidden');
    
    const topCareer = results.careers[0];
    const topCareerInfo = topCareer.info;
    const missingSkills = topCareerInfo.requiredSkills.filter(s => !userData.skills.includes(s));
    
    let html = `
        <div style="margin-bottom: 2rem;">
            <h3>Goal: <span style="color:var(--accent-cyan);">${topCareerInfo.icon} ${topCareer.name}</span></h3>
            <p style="color:var(--text-muted);">${topCareerInfo.description}</p>
        </div>
        
        <div class="analysis-section" style="margin-bottom: 2rem;">
            <h4><i data-lucide="crosshair" style="vertical-align:middle;margin-right:8px;color:var(--accent-pink);"></i>Skill Gap Analysis</h4>
            <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:15px;">
    `;
    
    if (missingSkills.length === 0) {
        html += `<div style="color:var(--accent-green);"><i data-lucide="check-circle" style="vertical-align:middle;margin-right:5px;"></i> You have all the core skills for this role!</div>`;
    } else {
        html += missingSkills.map(s => `<span class="badge" style="background:rgba(225, 112, 85, 0.2); color:#e17055; border:1px solid #e17055; padding:4px 10px; border-radius:15px;">Target: ${s}</span>`).join('');
    }
    
    html += `
            </div>
        </div>
        
        <div class="analysis-section" style="margin-bottom: 2rem;">
            <h4><i data-lucide="map" style="vertical-align:middle;margin-right:8px;color:var(--accent-green);"></i>Action Plan</h4>
            <ul style="list-style-type:none; padding:0; margin-top:15px; display:flex; flex-direction:column; gap:12px;">
    `;
    
    if (missingSkills.length > 0) {
        html += `<li style="display:flex; gap:10px;"><div style="color:var(--accent-orange);"><i data-lucide="book-open"></i></div> <div><strong>Master Missing Skills:</strong> Focus next 3 months on ${missingSkills.slice(0,3).join(', ')}.</div></li>`;
    }
    if (!userData.hasInternship) {
        html += `<li style="display:flex; gap:10px;"><div style="color:var(--accent-cyan);"><i data-lucide="building"></i></div> <div><strong>Get Practical Experience:</strong> Apply for an internship related to ${topCareer.name}.</div></li>`;
    }
    if (userData.projectCount < 2) {
        html += `<li style="display:flex; gap:10px;"><div style="color:var(--accent-purple);"><i data-lucide="folder-plus"></i></div> <div><strong>Build Portfolio:</strong> Complete at least 2 end-to-end projects demonstrating your skills.</div></li>`;
    }
    if (userData.certifications < 1) {
        html += `<li style="display:flex; gap:10px;"><div style="color:var(--accent-pink);"><i data-lucide="award"></i></div> <div><strong>Earn Certifications:</strong> Consider an industry-recognized certification for ${topCareer.name}.</div></li>`;
    }
    if (userData.sgpa < topCareerInfo.minCGPA) {
        html += `<li style="display:flex; gap:10px;"><div style="color:var(--text);"><i data-lucide="trending-up"></i></div> <div><strong>Improve Academics:</strong> Aim to raise your GPA above ${topCareerInfo.minCGPA} to pass basic screening filters.</div></li>`;
    }
    
    if (missingSkills.length === 0 && userData.projectCount >= 2 && userData.hasInternship) {
        html += `<li style="display:flex; gap:10px;"><div style="color:var(--accent-green);"><i data-lucide="rocket"></i></div> <div><strong>You are job-ready!</strong> Start applying for full-time roles and working on interview prep.</div></li>`;
    }
    
    html += `
            </ul>
        </div>
        
        <div class="analysis-section">
            <h4><i data-lucide="line-chart" style="vertical-align:middle;margin-right:8px;color:var(--accent-yellow);"></i>Career Outlook</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div class="glass-card" style="padding: 15px;">
                    <div style="color:var(--text-muted); font-size:0.9rem;">Average Salary</div>
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--accent-green);">${topCareerInfo.avg_salary || 'Competitive'}</div>
                </div>
                <div class="glass-card" style="padding: 15px;">
                    <div style="color:var(--text-muted); font-size:0.9rem;">Growth Trend</div>
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--accent-purple);">${topCareerInfo.growth || 'High'}</div>
                </div>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
}
