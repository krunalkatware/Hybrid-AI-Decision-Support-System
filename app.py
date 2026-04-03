"""
═══════════════════════════════════════════════════════════════
  HYBRID AI CAREER DECISION SUPPORT SYSTEM — Flask Backend
  Combines Rule-Based Engine + ML-Style Prediction Engine
  Author: AI Career Advisor System
═══════════════════════════════════════════════════════════════
"""

from flask import Flask, request, jsonify, send_from_directory
import math
import json
from datetime import datetime

# ─── Flask App Config ───
# Serve HTML/CSS/JS from the current directory
app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

# Enable CORS for local development
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response


# ═══════════════════════════════════════════════════════════════
#  CAREER DATABASE — Knowledge Base for the Hybrid AI Engine
# ═══════════════════════════════════════════════════════════════

CAREER_DATABASE = {
    "Full-Stack Web Developer": {
        "required_skills": ["JavaScript", "React", "Node.js", "HTML/CSS", "SQL", "MongoDB", "Git", "TypeScript"],
        "related_interests": ["web"],
        "min_cgpa": 6.0,
        "icon": "🌐",
        "color": "#6c5ce7",
        "description": "Build complete web applications from frontend to backend, designing user interfaces and server-side logic.",
        "avg_salary": "₹6-15 LPA",
        "growth": "High"
    },
    "AI/ML Engineer": {
        "required_skills": ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "R"],
        "related_interests": ["aiml"],
        "min_cgpa": 7.0,
        "icon": "🤖",
        "color": "#00cec9",
        "description": "Design, train, and deploy machine learning models and intelligent AI systems for real-world applications.",
        "avg_salary": "₹8-25 LPA",
        "growth": "Very High"
    },
    "Data Scientist": {
        "required_skills": ["Python", "R", "SQL", "Pandas", "NumPy", "Scikit-Learn", "Tableau", "Power BI"],
        "related_interests": ["datascience"],
        "min_cgpa": 7.0,
        "icon": "📊",
        "color": "#fd79a8",
        "description": "Extract actionable insights from complex data using statistical analysis and machine learning techniques.",
        "avg_salary": "₹7-20 LPA",
        "growth": "Very High"
    },
    "Cybersecurity Analyst": {
        "required_skills": ["Python", "Linux", "C++", "SQL", "Git"],
        "related_interests": ["cybersecurity"],
        "min_cgpa": 6.5,
        "icon": "🔒",
        "color": "#e17055",
        "description": "Protect organizational systems and networks from cyber threats, vulnerabilities, and security attacks.",
        "avg_salary": "₹5-18 LPA",
        "growth": "High"
    },
    "Cloud Solutions Architect": {
        "required_skills": ["AWS", "Docker", "Kubernetes", "Linux", "Python", "Git"],
        "related_interests": ["cloud", "devops"],
        "min_cgpa": 6.5,
        "icon": "☁️",
        "color": "#0984e3",
        "description": "Design and manage scalable, reliable cloud infrastructure and services for enterprise applications.",
        "avg_salary": "₹10-30 LPA",
        "growth": "Very High"
    },
    "Mobile App Developer": {
        "required_skills": ["Kotlin", "Swift", "Flutter", "JavaScript", "React", "Git"],
        "related_interests": ["mobile"],
        "min_cgpa": 6.0,
        "icon": "📱",
        "color": "#00b894",
        "description": "Create native and cross-platform mobile applications for Android and iOS ecosystems.",
        "avg_salary": "₹5-15 LPA",
        "growth": "High"
    },
    "DevOps Engineer": {
        "required_skills": ["Docker", "Kubernetes", "AWS", "Linux", "Git", "Python"],
        "related_interests": ["devops", "cloud"],
        "min_cgpa": 6.5,
        "icon": "⚙️",
        "color": "#fdcb6e",
        "description": "Automate and streamline software delivery pipelines, deployment, and infrastructure operations.",
        "avg_salary": "₹7-22 LPA",
        "growth": "High"
    },
    "Blockchain Developer": {
        "required_skills": ["JavaScript", "Python", "C++", "Git"],
        "related_interests": ["blockchain"],
        "min_cgpa": 7.0,
        "icon": "🔗",
        "color": "#a29bfe",
        "description": "Build decentralized applications, smart contracts, and distributed ledger technology solutions.",
        "avg_salary": "₹8-25 LPA",
        "growth": "Emerging"
    },
    "Game Developer": {
        "required_skills": ["C++", "C#", "Python", "JavaScript", "Git"],
        "related_interests": ["gamedev"],
        "min_cgpa": 6.0,
        "icon": "🎮",
        "color": "#e84393",
        "description": "Design and develop interactive video games for PC, console, and mobile platforms.",
        "avg_salary": "₹4-15 LPA",
        "growth": "Moderate"
    },
    "IoT Engineer": {
        "required_skills": ["Python", "C++", "Linux", "AWS", "Git"],
        "related_interests": ["iot"],
        "min_cgpa": 6.5,
        "icon": "📡",
        "color": "#00cec9",
        "description": "Connect physical devices with intelligent software systems for smart solutions and automation.",
        "avg_salary": "₹5-16 LPA",
        "growth": "High"
    }
}

# ─── Skill → Interest Domain Mapping (for rule-based alignment checks) ───
INTEREST_SKILL_MAP = {
    "web":           ["JavaScript", "React", "Node.js", "HTML/CSS", "TypeScript", "MongoDB", "SQL"],
    "aiml":          ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "R"],
    "datascience":   ["Python", "R", "SQL", "Pandas", "Tableau", "Power BI", "NumPy", "Scikit-Learn"],
    "cybersecurity": ["Python", "Linux", "C++", "SQL", "Git"],
    "cloud":         ["AWS", "Docker", "Kubernetes", "Linux", "Python"],
    "mobile":        ["Kotlin", "Swift", "Flutter", "React", "JavaScript"],
    "devops":        ["Docker", "Kubernetes", "AWS", "Linux", "Git", "Python"],
    "blockchain":    ["JavaScript", "Python", "C++", "Git"],
    "gamedev":       ["C++", "C#", "Python", "JavaScript"],
    "iot":           ["Python", "C++", "Linux", "AWS", "Git"]
}


# ═══════════════════════════════════════════════════════════════
#  ROUTES — Serve Frontend Pages
# ═══════════════════════════════════════════════════════════════

@app.route('/')
def index():
    """Serve the main application page."""
    return send_from_directory('.', 'index.html')


@app.route('/health')
def health():
    """Health check endpoint for system status monitoring."""
    return jsonify({
        "status": "active",
        "engine": "Hybrid AI v2.0",
        "components": {
            "rule_engine": "online",
            "prediction_engine": "online",
            "fusion_module": "online"
        },
        "timestamp": datetime.now().isoformat(),
        "careers_loaded": len(CAREER_DATABASE)
    })


# ═══════════════════════════════════════════════════════════════
#  API ENDPOINT — Main Analysis Route
# ═══════════════════════════════════════════════════════════════

@app.route('/api/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    """
    Main AI analysis endpoint.
    Receives user profile data and returns hybrid AI career recommendations.

    Expected JSON body:
    {
        "sgpa": float,
        "cgpa": float,
        "interest": str,
        "skills": [str],
        "hasInternship": bool,
        "internshipDesc": str,
        "projectCount": int,
        "projectDesc": str,
        "hackathons": int,
        "certifications": int
    }

    Returns:
    {
        "rules": [...],
        "predictions": {...},
        "careers": [...],
        "confidence": int,
        "metadata": {...}
    }
    """
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        sgpa = float(data.get('sgpa', 0))
        cgpa = float(data.get('cgpa', 0))
        interest = data.get('interest', '')
        skills = data.get('skills', [])

        if not (0 <= sgpa <= 10) or not (0 <= cgpa <= 10):
            return jsonify({"error": "SGPA and CGPA must be between 0 and 10"}), 400
        if not interest:
            return jsonify({"error": "Interest area is required"}), 400
        if not skills:
            return jsonify({"error": "At least one skill is required"}), 400

        # ═══ Run Hybrid AI Analysis ═══
        user_data = {
            "sgpa": sgpa,
            "cgpa": cgpa,
            "interest": interest,
            "skills": skills,
            "hasInternship": data.get('hasInternship', False),
            "internshipDesc": data.get('internshipDesc', ''),
            "projectCount": int(data.get('projectCount', 0)),
            "projectDesc": data.get('projectDesc', ''),
            "hackathons": int(data.get('hackathons', 0)),
            "certifications": int(data.get('certifications', 0))
        }

        # Run each engine component
        rule_results = rule_based_engine(user_data)
        prediction_scores = prediction_engine(user_data)
        hybrid_careers = hybrid_fusion(rule_results, prediction_scores)
        confidence = calculate_confidence(user_data, hybrid_careers)

        # Build response
        response = {
            "rules": rule_results,
            "predictions": prediction_scores,
            "careers": hybrid_careers,
            "confidence": confidence,
            "metadata": {
                "engine_version": "2.0",
                "analysis_type": "hybrid",
                "timestamp": datetime.now().isoformat(),
                "input_features": {
                    "academic_avg": round((sgpa + cgpa) / 2, 2),
                    "skill_count": len(skills),
                    "experience_score": compute_experience_score(user_data),
                    "interest_area": interest
                }
            }
        }

        return jsonify(response)

    except ValueError as e:
        return jsonify({"error": f"Invalid input data: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500


# ═══════════════════════════════════════════════════════════════
#  ENGINE 1: RULE-BASED ANALYSIS (Deterministic Logic)
# ═══════════════════════════════════════════════════════════════

def rule_based_engine(data):
    """
    Applies deterministic IF-THEN rules to evaluate the user profile.

    Rule Categories:
    1. Academic Performance Rules (GPA thresholds)
    2. Performance Trend Rules (SGPA vs CGPA)
    3. Skill-Interest Alignment Rules
    4. Experience Depth Rules
    5. Certification Rules

    Returns a list of rule evaluations with type (pass/warn/fail) and explanation.
    """
    rules = []
    sgpa = data["sgpa"]
    cgpa = data["cgpa"]
    skills = data["skills"]
    interest = data["interest"]
    avg_gpa = (sgpa + cgpa) / 2

    # ────────────────────────────────────
    # RULE 1: Academic Performance Tiers
    # ────────────────────────────────────
    if avg_gpa >= 8.5:
        rules.append({
            "type": "pass",
            "rule_id": "ACAD_TIER_1",
            "category": "Academic",
            "text": f"<strong>Excellent academic record</strong> (avg GPA: {avg_gpa:.1f}/10). "
                    f"Opens doors to top-tier research positions, competitive roles, and higher studies."
        })
    elif avg_gpa >= 7.0:
        rules.append({
            "type": "pass",
            "rule_id": "ACAD_TIER_2",
            "category": "Academic",
            "text": f"<strong>Good academic standing</strong> (avg GPA: {avg_gpa:.1f}/10). "
                    f"Qualifies for most industry roles, campus placements, and further studies."
        })
    elif avg_gpa >= 5.5:
        rules.append({
            "type": "warn",
            "rule_id": "ACAD_TIER_3",
            "category": "Academic",
            "text": f"<strong>Average academic performance</strong> (avg GPA: {avg_gpa:.1f}/10). "
                    f"Consider strengthening your skills portfolio and projects to compensate."
        })
    else:
        rules.append({
            "type": "fail",
            "rule_id": "ACAD_TIER_4",
            "category": "Academic",
            "text": f"<strong>Below-threshold academics</strong> (avg GPA: {avg_gpa:.1f}/10). "
                    f"Strong skills, projects, and certifications become critical differentiators."
        })

    # ────────────────────────────────────
    # RULE 2: Performance Trend Analysis
    # ────────────────────────────────────
    gpa_diff = sgpa - cgpa
    if gpa_diff > 0.5:
        rules.append({
            "type": "pass",
            "rule_id": "TREND_POS",
            "category": "Trend",
            "text": f"<strong>Positive performance trend</strong> detected. "
                    f"Current SGPA ({sgpa:.1f}) exceeds CGPA ({cgpa:.1f}) by {gpa_diff:.1f} points — shows active improvement."
        })
    elif gpa_diff < -0.5:
        rules.append({
            "type": "warn",
            "rule_id": "TREND_NEG",
            "category": "Trend",
            "text": f"<strong>Performance dip detected</strong>. "
                    f"Current SGPA ({sgpa:.1f}) is lower than CGPA ({cgpa:.1f}) by {abs(gpa_diff):.1f} — recent semester needs attention."
        })
    else:
        rules.append({
            "type": "pass",
            "rule_id": "TREND_STABLE",
            "category": "Trend",
            "text": f"<strong>Stable academic performance</strong>. "
                    f"SGPA ({sgpa:.1f}) and CGPA ({cgpa:.1f}) are consistent — shows reliability."
        })

    # ────────────────────────────────────
    # RULE 3: Skill-Interest Alignment
    # ────────────────────────────────────
    relevant_skills = INTEREST_SKILL_MAP.get(interest, [])
    matched_skills = [s for s in skills if s in relevant_skills]
    match_ratio = len(matched_skills) / len(relevant_skills) if relevant_skills else 0
    missing_skills = [s for s in relevant_skills if s not in skills][:4]

    if match_ratio >= 0.6:
        rules.append({
            "type": "pass",
            "rule_id": "SKILL_ALIGN_HIGH",
            "category": "Skill-Interest",
            "text": f"<strong>Strong skill-interest alignment</strong> ({match_ratio:.0%}). "
                    f"Your skills ({', '.join(matched_skills[:4])}) match your chosen interest area well."
        })
    elif match_ratio >= 0.3:
        rules.append({
            "type": "warn",
            "rule_id": "SKILL_ALIGN_MED",
            "category": "Skill-Interest",
            "text": f"<strong>Partial skill-interest match</strong> ({match_ratio:.0%}). "
                    f"Consider adding: {', '.join(missing_skills[:3])} to strengthen alignment."
        })
    else:
        rules.append({
            "type": "fail",
            "rule_id": "SKILL_ALIGN_LOW",
            "category": "Skill-Interest",
            "text": f"<strong>Low skill-interest alignment</strong> ({match_ratio:.0%}). "
                    f"Significant upskilling needed: {', '.join(missing_skills[:4])}."
        })

    # ────────────────────────────────────
    # RULE 4: Experience Depth Evaluation
    # ────────────────────────────────────
    has_internship = data["hasInternship"]
    project_count = data["projectCount"]
    hackathons = data["hackathons"]
    certifications = data["certifications"]

    exp_score = 0
    if has_internship:
        exp_score += 3
    exp_score += min(project_count, 5)
    exp_score += min(hackathons, 3)
    exp_score += min(certifications, 3)

    if exp_score >= 8:
        rules.append({
            "type": "pass",
            "rule_id": "EXP_STRONG",
            "category": "Experience",
            "text": f"<strong>Strong practical profile</strong>. "
                    f"{'Industry internship + ' if has_internship else ''}"
                    f"{project_count} project(s)"
                    f"{f' + {hackathons} hackathon(s)' if hackathons else ''}"
                    f" — positions you competitively."
        })
    elif exp_score >= 4:
        gap = "internship experience" if not has_internship else "more hands-on projects"
        rules.append({
            "type": "warn",
            "rule_id": "EXP_MODERATE",
            "category": "Experience",
            "text": f"<strong>Moderate practical experience</strong>. "
                    f"Consider gaining {gap} for stronger industry prospects."
        })
    else:
        rules.append({
            "type": "fail",
            "rule_id": "EXP_WEAK",
            "category": "Experience",
            "text": f"<strong>Limited practical exposure</strong>. "
                    f"Urgently build portfolio with projects, internships, and competitive coding."
        })

    # ────────────────────────────────────
    # RULE 5: Certification Assessment
    # ────────────────────────────────────
    if certifications >= 3:
        rules.append({
            "type": "pass",
            "rule_id": "CERT_STRONG",
            "category": "Certifications",
            "text": f"<strong>Well-certified</strong> with {certifications} certification(s). "
                    f"Demonstrates commitment to continuous learning and skill validation."
        })
    elif certifications >= 1:
        rules.append({
            "type": "warn",
            "rule_id": "CERT_MODERATE",
            "category": "Certifications",
            "text": f"<strong>{certifications} certification(s)</strong> earned. "
                    f"More recognized industry certifications (AWS, Google, etc.) can strengthen your profile."
        })

    # ────────────────────────────────────
    # RULE 6: Skill Breadth Check
    # ────────────────────────────────────
    if len(skills) >= 8:
        rules.append({
            "type": "pass",
            "rule_id": "BREADTH_WIDE",
            "category": "Skills",
            "text": f"<strong>Broad skill portfolio</strong> with {len(skills)} technologies. "
                    f"Versatile profile suitable for multiple career paths."
        })
    elif len(skills) >= 4:
        rules.append({
            "type": "warn",
            "rule_id": "BREADTH_MED",
            "category": "Skills",
            "text": f"<strong>Moderate skill range</strong> ({len(skills)} technologies). "
                    f"Consider expanding to adjacent technologies for greater versatility."
        })
    else:
        rules.append({
            "type": "fail",
            "rule_id": "BREADTH_NARROW",
            "category": "Skills",
            "text": f"<strong>Narrow skill set</strong> ({len(skills)} technologies). "
                    f"Broaden your technical stack to increase career options."
        })

    return rules


# ═══════════════════════════════════════════════════════════════
#  ENGINE 2: INTELLIGENT PREDICTION (ML-Style Weighted Scoring)
# ═══════════════════════════════════════════════════════════════

def prediction_engine(data):
    """
    ML-style prediction engine using weighted feature scoring.

    Features & Weights:
    - Skill Match Score:    35% (cosine-like similarity between user skills and career requirements)
    - Interest Alignment:   25% (direct + partial match scoring)
    - Academic Suitability: 20% (GPA thresholds with soft boundaries)
    - Experience Score:     20% (composite experience metric)

    Returns a dictionary of career → score (0-100) mappings.
    """
    skills = set(data["skills"])
    interest = data["interest"]
    avg_gpa = (data["sgpa"] + data["cgpa"]) / 2
    exp_score = compute_experience_score(data)

    scores = {}

    for career, info in CAREER_DATABASE.items():
        required = set(info["required_skills"])
        total_score = 0.0

        # ── Feature 1: Skill Match (0-35) ──
        # Uses Jaccard-inspired similarity with emphasis on coverage
        if required:
            matched = skills & required
            coverage = len(matched) / len(required)      # How much of required you have
            overlap = len(matched) / max(len(skills), 1)  # How focused your skills are

            # Weighted combination: 70% coverage, 30% focus
            skill_similarity = (0.7 * coverage) + (0.3 * overlap)
            skill_score = skill_similarity * 35

            # Bonus for having extra related skills beyond requirements
            extra_relevant = len(skills - required)
            if extra_relevant > 0:
                skill_score += min(extra_relevant * 0.5, 3)

            total_score += min(skill_score, 35)

        # ── Feature 2: Interest Alignment (0-25) ──
        if interest in info["related_interests"]:
            total_score += 25  # Full match
        else:
            # Partial score based on interest proximity
            # (some interests are related, e.g., cloud ↔ devops)
            interest_groups = [
                {"cloud", "devops"},
                {"aiml", "datascience"},
                {"web", "mobile"},
                {"blockchain", "cybersecurity"}
            ]
            partial = False
            for group in interest_groups:
                if interest in group and any(ri in group for ri in info["related_interests"]):
                    total_score += 12  # Partial related match
                    partial = True
                    break
            if not partial:
                total_score += 3.75  # Minimal baseline

        # ── Feature 3: Academic Suitability (0-20) ──
        min_cgpa = info["min_cgpa"]
        if avg_gpa >= min_cgpa:
            # Sigmoid-like scaling: diminishing returns above threshold
            excess = avg_gpa - min_cgpa
            academic_score = 14 + min(excess * 2, 6)  # 14-20 range
        else:
            # Below threshold: proportional penalty
            deficit_ratio = avg_gpa / min_cgpa
            academic_score = deficit_ratio * 14  # 0-14 range
        total_score += min(academic_score, 20)

        # ── Feature 4: Experience Score (0-20) ──
        # Already computed as 0-20 value
        total_score += min(exp_score, 20)

        # Normalize and store
        scores[career] = round(min(max(total_score, 5), 100))

    return scores


def compute_experience_score(data):
    """
    Computes composite experience score (0-20 scale).
    Weights:
    - Internship: 7 points (binary + quality)
    - Projects: up to 6 points (diminishing returns)
    - Hackathons: up to 4 points
    - Certifications: up to 3 points
    """
    score = 0.0

    # Internship (0-7)
    if data.get("hasInternship"):
        score += 5
        # Bonus if description provided (quality indicator)
        if data.get("internshipDesc", "").strip():
            score += 2

    # Projects (0-6, diminishing returns)
    project_count = data.get("projectCount", 0)
    if project_count > 0:
        score += min(project_count * 1.5, 6)

    # Hackathons (0-4)
    hackathons = data.get("hackathons", 0)
    score += min(hackathons * 1.5, 4)

    # Certifications (0-3)
    certs = data.get("certifications", 0)
    score += min(certs * 1.0, 3)

    return round(min(score, 20), 1)


# ═══════════════════════════════════════════════════════════════
#  ENGINE 3: HYBRID FUSION — Merge Rule + Prediction Results
# ═══════════════════════════════════════════════════════════════

def hybrid_fusion(rule_results, prediction_scores):
    """
    Merges rule-based evaluation with prediction scores.

    Fusion strategy:
    1. Sort careers by prediction score (top 5)
    2. Apply rule-based modifier based on pass/warn/fail counts
    3. Top career gets a small fusion boost (winner reinforcement)
    4. Clamp scores to [10, 98] range

    Returns sorted list of top 5 career recommendations.
    """
    # Sort by prediction score, take top 5
    sorted_careers = sorted(prediction_scores.items(), key=lambda x: x[1], reverse=True)[:5]

    # Calculate rule-based modifier
    pass_count = sum(1 for r in rule_results if r["type"] == "pass")
    warn_count = sum(1 for r in rule_results if r["type"] == "warn")
    fail_count = sum(1 for r in rule_results if r["type"] == "fail")

    # Net modifier: +3 per pass, -1 per warn, -3 per fail
    rule_modifier = (pass_count * 3) - (warn_count * 1) - (fail_count * 3)

    # Generate career list with adjusted scores
    result = []
    for i, (career, score) in enumerate(sorted_careers):
        adjusted = score + rule_modifier

        # Winner reinforcement: top career gets +5 fusion boost
        if i == 0:
            adjusted += 5

        # Clamp to valid range
        adjusted = max(10, min(98, adjusted))

        career_info = CAREER_DATABASE[career]
        result.append({
            "name": career,
            "score": adjusted,
            "info": {
                "icon": career_info["icon"],
                "color": career_info["color"],
                "description": career_info["description"],
                "avg_salary": career_info["avg_salary"],
                "growth": career_info["growth"],
                "required_skills": career_info["required_skills"]
            }
        })

    # Re-sort after adjustment
    result.sort(key=lambda x: x["score"], reverse=True)
    return result


# ═══════════════════════════════════════════════════════════════
#  CONFIDENCE CALCULATOR
# ═══════════════════════════════════════════════════════════════

def calculate_confidence(data, careers):
    """
    Calculates AI system confidence in its predictions.

    Factors:
    - Data completeness (more inputs → higher confidence)
    - Score spread (clear winner → higher confidence)
    - Skill coverage (more skills → better signal)
    - Interest specificity
    """
    confidence = 50  # Base confidence

    # Skill data richness
    skill_count = len(data.get("skills", []))
    confidence += min(skill_count * 2, 15)

    # Clear interest signal
    if data.get("interest"):
        confidence += 10

    # Experience data depth
    if data.get("hasInternship"):
        confidence += 5
    confidence += min(data.get("projectCount", 0) * 2, 8)
    confidence += min(data.get("hackathons", 0) * 1.5, 4)
    confidence += min(data.get("certifications", 0) * 1, 3)

    # Score decisiveness (gap between 1st and 2nd recommendation)
    if len(careers) >= 2:
        gap = careers[0]["score"] - careers[1]["score"]
        confidence += min(gap * 0.5, 10)

    return max(40, min(95, round(confidence)))


# ═══════════════════════════════════════════════════════════════
#  ADDITIONAL API ENDPOINTS
# ═══════════════════════════════════════════════════════════════

@app.route('/api/careers', methods=['GET'])
def get_careers():
    """Return all available career paths in the knowledge base."""
    careers = []
    for name, info in CAREER_DATABASE.items():
        careers.append({
            "name": name,
            "icon": info["icon"],
            "color": info["color"],
            "description": info["description"],
            "required_skills": info["required_skills"],
            "related_interests": info["related_interests"],
            "min_cgpa": info["min_cgpa"],
            "avg_salary": info["avg_salary"],
            "growth": info["growth"]
        })
    return jsonify({"careers": careers, "count": len(careers)})


@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Return all skills recognized by the system."""
    skills = [
        {"name": "Python",       "icon": "🐍", "category": "language"},
        {"name": "Java",         "icon": "☕", "category": "language"},
        {"name": "JavaScript",   "icon": "⚡", "category": "language"},
        {"name": "C++",          "icon": "⚙️", "category": "language"},
        {"name": "C#",           "icon": "🔷", "category": "language"},
        {"name": "R",            "icon": "📊", "category": "language"},
        {"name": "TypeScript",   "icon": "🔷", "category": "language"},
        {"name": "Kotlin",       "icon": "🟣", "category": "language"},
        {"name": "Swift",        "icon": "🍎", "category": "language"},
        {"name": "SQL",          "icon": "🗄️", "category": "database"},
        {"name": "MongoDB",      "icon": "🍃", "category": "database"},
        {"name": "React",        "icon": "⚛️", "category": "framework"},
        {"name": "Node.js",      "icon": "🟢", "category": "framework"},
        {"name": "Django",       "icon": "🎸", "category": "framework"},
        {"name": "Flask",        "icon": "🧪", "category": "framework"},
        {"name": "Flutter",      "icon": "💙", "category": "framework"},
        {"name": "TensorFlow",   "icon": "🧠", "category": "aiml"},
        {"name": "PyTorch",      "icon": "🔥", "category": "aiml"},
        {"name": "Scikit-Learn", "icon": "📈", "category": "aiml"},
        {"name": "Pandas",       "icon": "🐼", "category": "aiml"},
        {"name": "NumPy",        "icon": "🔢", "category": "aiml"},
        {"name": "Docker",       "icon": "🐳", "category": "devops"},
        {"name": "Kubernetes",   "icon": "☸️", "category": "devops"},
        {"name": "AWS",          "icon": "☁️", "category": "cloud"},
        {"name": "Git",          "icon": "📦", "category": "tool"},
        {"name": "Linux",        "icon": "🐧", "category": "tool"},
        {"name": "HTML/CSS",     "icon": "🎨", "category": "web"},
        {"name": "Tableau",      "icon": "📉", "category": "tool"},
        {"name": "Power BI",     "icon": "📊", "category": "tool"},
        {"name": "Figma",        "icon": "🎨", "category": "tool"},
    ]
    return jsonify({"skills": skills, "count": len(skills)})


@app.route('/api/interests', methods=['GET'])
def get_interests():
    """Return all interest areas with their labels."""
    interests = [
        {"value": "web",           "label": "🌐 Web Development"},
        {"value": "aiml",          "label": "🤖 AI / Machine Learning"},
        {"value": "datascience",   "label": "📊 Data Science"},
        {"value": "cybersecurity", "label": "🔒 Cybersecurity"},
        {"value": "cloud",         "label": "☁️ Cloud Computing"},
        {"value": "mobile",        "label": "📱 Mobile Development"},
        {"value": "devops",        "label": "⚙️ DevOps Engineering"},
        {"value": "blockchain",    "label": "🔗 Blockchain"},
        {"value": "gamedev",       "label": "🎮 Game Development"},
        {"value": "iot",           "label": "📡 IoT (Internet of Things)"},
    ]
    return jsonify({"interests": interests})


# ═══════════════════════════════════════════════════════════════
#  RUN SERVER
# ═══════════════════════════════════════════════════════════════

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("  HYBRID AI CAREER DECISION SUPPORT SYSTEM")
    print("  Flask Server Starting...")
    print("=" * 60)
    print(f"  Web App:  http://localhost:5000")
    print(f"  API:      http://localhost:5000/api/analyze")
    print(f"  Health:   http://localhost:5000/health")
    print("=" * 60 + "\n")

    app.run(debug=True, host='0.0.0.0', port=5000)
