/**
 * trAIN Co Asset Registry
 * Pre-generated assets for Saudi Vision 2030 Talent Platform
 * 
 * Usage: Pass assetId to SmartImage component
 * - If assetId exists here → loads local file instantly
 * - If assetId NOT here → SmartImage treats it as a prompt and generates via AI
 * 
 * ONLY assets that ACTUALLY EXIST in /public/assets are listed here.
 */

export interface AssetDefinition {
    id: string;
    path: string;
    alt: string;
    description: string;
    generationPrompt: string;
    category: "avatar" | "company" | "badge" | "training" | "hero" | "ui" | "icon" | "welcome";
}

export const ASSET_REGISTRY: Record<string, AssetDefinition> = {
    // ========================================
    // AVATARS & PLACEHOLDERS
    // ========================================
    "candidate-avatar": {
        id: "candidate-avatar",
        path: "/assets/candidate-avatar.png",
        alt: "Candidate Avatar",
        description: "Default candidate profile avatar",
        generationPrompt: "Professional headshot placeholder, Saudi Arabian young professional, confident smile, business attire, neutral gray background, 8k portrait photography",
        category: "avatar"
    },

    // ========================================
    // UI ELEMENTS
    // ========================================
    "lesson-placeholder": {
        id: "lesson-placeholder",
        path: "/assets/lesson-placeholder.png",
        alt: "Lesson Placeholder",
        description: "Default lesson thumbnail",
        generationPrompt: "Minimal lesson thumbnail placeholder, book and lightbulb icon, blue gradient background, clean design",
        category: "ui"
    },

    // ========================================
    // WELCOME EXPERIENCE IMAGES
    // ========================================
    "welcome-career-applications": {
        id: "welcome-career-applications",
        path: "/assets/welcome/career_applications.png",
        alt: "Career Applications",
        description: "Welcome screen - career applications visual",
        generationPrompt: "Career applications and job hunting concept, professional Saudi job seeker, modern digital interface, Vision 2030 aesthetic",
        category: "welcome"
    },
    "welcome-career-dashboard": {
        id: "welcome-career-dashboard",
        path: "/assets/welcome/career_dashboard.png",
        alt: "Career Dashboard",
        description: "Welcome screen - career dashboard visual",
        generationPrompt: "Career dashboard interface, analytics and progress tracking, Saudi professional reviewing career metrics, modern UI",
        category: "welcome"
    },
    "welcome-career-interview": {
        id: "welcome-career-interview",
        path: "/assets/welcome/career_interview.png",
        alt: "Career Interview",
        description: "Welcome screen - interview preparation visual",
        generationPrompt: "Professional interview setting, confident Saudi candidate, modern office environment, success atmosphere",
        category: "welcome"
    },
    "welcome-career-new-role": {
        id: "welcome-career-new-role",
        path: "/assets/welcome/career_new_role.png",
        alt: "New Role",
        description: "Welcome screen - new role celebration",
        generationPrompt: "Career achievement celebration, Saudi professional starting new role, Vision 2030 success story",
        category: "welcome"
    },
    "welcome-career-skills-assessment": {
        id: "welcome-career-skills-assessment",
        path: "/assets/welcome/career_skills_assessment.png",
        alt: "Skills Assessment",
        description: "Welcome screen - skills assessment visual",
        generationPrompt: "Skills assessment and evaluation, professional skill testing, modern digital assessment interface",
        category: "welcome"
    },
    "welcome-career-training-course": {
        id: "welcome-career-training-course",
        path: "/assets/welcome/career_training_course.png",
        alt: "Training Course",
        description: "Welcome screen - training course visual",
        generationPrompt: "Professional training and upskilling, Saudi learner in modern training environment, digital learning",
        category: "welcome"
    },
    "welcome-job-exploration": {
        id: "welcome-job-exploration",
        path: "/assets/welcome/job-exploration.png",
        alt: "Job Exploration",
        description: "Welcome screen - job exploration visual",
        generationPrompt: "Job exploration and discovery, Saudi professional browsing Vision 2030 opportunities, modern interface",
        category: "welcome"
    },
    "welcome-profile-building": {
        id: "welcome-profile-building",
        path: "/assets/welcome/profile-building.png",
        alt: "Profile Building",
        description: "Welcome screen - profile building visual",
        generationPrompt: "Professional profile creation, Saudi candidate building career profile, skills and experience showcase",
        category: "welcome"
    },
    "welcome-upskill-training": {
        id: "welcome-upskill-training",
        path: "/assets/welcome/upskill-training.png",
        alt: "Upskill Training",
        description: "Welcome screen - upskilling visual",
        generationPrompt: "Upskilling and continuous learning, Saudi professional gaining new skills, modern training technology",
        category: "welcome"
    },
};

// Helper: Get all assets by category
export const getAssetsByCategory = (category: AssetDefinition["category"]): AssetDefinition[] => {
    return Object.values(ASSET_REGISTRY).filter(asset => asset.category === category);
};

// Helper: Check if asset exists
export const assetExists = (assetId: string): boolean => {
    return assetId in ASSET_REGISTRY;
};

// All available asset IDs for documentation
export const ALL_ASSET_IDS = Object.keys(ASSET_REGISTRY);
