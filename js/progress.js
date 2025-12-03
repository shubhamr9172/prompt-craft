// Progress Tracking System
const Progress = {
    // Initialize progress from localStorage
    init() {
        if (!localStorage.getItem('promptcraft_progress')) {
            this.reset();
        }
        return this.get();
    },

    // Get all progress data
    get() {
        return JSON.parse(localStorage.getItem('promptcraft_progress') || '{}');
    },

    // Save progress data
    save(data) {
        localStorage.setItem('promptcraft_progress', JSON.stringify(data));
    },

    // Reset all progress
    reset() {
        const initialProgress = {
            modules: {},
            quizzes: {},
            lastVisited: null,
            startedAt: new Date().toISOString(),
            totalTimeSpent: 0
        };
        this.save(initialProgress);
        return initialProgress;
    },

    // Mark module as completed
    completeModule(moduleId) {
        const progress = this.get();
        if (!progress.modules[moduleId]) {
            progress.modules[moduleId] = {
                completed: true,
                completedAt: new Date().toISOString(),
                visits: 1
            };
        } else {
            progress.modules[moduleId].completed = true;
            progress.modules[moduleId].completedAt = new Date().toISOString();
        }
        this.save(progress);
        this.updateUI();
        return progress;
    },

    // Track module visit
    visitModule(moduleId) {
        const progress = this.get();
        if (!progress.modules[moduleId]) {
            progress.modules[moduleId] = {
                completed: false,
                visits: 1,
                firstVisit: new Date().toISOString()
            };
        } else {
            progress.modules[moduleId].visits = (progress.modules[moduleId].visits || 0) + 1;
        }
        progress.lastVisited = moduleId;
        this.save(progress);
    },

    // Save quiz score
    saveQuizScore(moduleId, score, total) {
        const progress = this.get();
        if (!progress.quizzes[moduleId]) {
            progress.quizzes[moduleId] = [];
        }
        progress.quizzes[moduleId].push({
            score,
            total,
            percentage: Math.round((score / total) * 100),
            completedAt: new Date().toISOString()
        });

        // If quiz passed (70%+), mark module as completed
        if ((score / total) >= 0.7) {
            this.completeModule(moduleId);
        }

        this.save(progress);
        this.updateUI();
        return progress;
    },

    // Get best quiz score for a module
    getBestScore(moduleId) {
        const progress = this.get();
        const attempts = progress.quizzes[moduleId];
        if (!attempts || attempts.length === 0) return null;

        return attempts.reduce((best, attempt) => {
            return attempt.percentage > best.percentage ? attempt : best;
        });
    },

    // Calculate overall progress percentage
    getOverallProgress() {
        const progress = this.get();
        const totalModules = window.MODULES_DATA ? window.MODULES_DATA.length : 10;
        const completedModules = Object.values(progress.modules).filter(m => m.completed).length;
        return Math.round((completedModules / totalModules) * 100);
    },

    // Get completion stats
    getStats() {
        const progress = this.get();
        const totalModules = window.MODULES_DATA ? window.MODULES_DATA.length : 10;
        const completed = Object.values(progress.modules).filter(m => m.completed).length;
        const inProgress = Object.values(progress.modules).filter(m => !m.completed && m.visits > 0).length;
        const totalQuizzes = Object.keys(progress.quizzes).length;

        return {
            totalModules,
            completed,
            inProgress,
            notStarted: totalModules - completed - inProgress,
            totalQuizzes,
            overallProgress: this.getOverallProgress()
        };
    },

    // Get next recommended module
    getNextModule() {
        const progress = this.get();
        const modules = window.MODULES_DATA || [];

        // Find first incomplete module
        for (let module of modules) {
            if (!progress.modules[module.id] || !progress.modules[module.id].completed) {
                return module.id;
            }
        }

        // All complete! Return first module for review
        return modules.length > 0 ? modules[0].id : null;
    },

    // Update UI elements
    updateUI() {
        // Update progress bar
        const progressBar = document.querySelector('.global-progress-fill');
        if (progressBar) {
            const percentage = this.getOverallProgress();
            progressBar.style.width = percentage + '%';
        }

        // Update progress text
        const progressText = document.querySelector('.progress-percentage');
        if (progressText) {
            progressText.textContent = this.getOverallProgress() + '%';
        }

        // Update module cards with completion badges
        const stats = this.getStats();
        document.querySelectorAll('.module-card').forEach((card, index) => {
            const moduleId = index + 1;
            const moduleProgress = this.get().modules[moduleId];

            // Remove existing badge
            const existingBadge = card.querySelector('.completion-badge');
            if (existingBadge) existingBadge.remove();

            // Add completion badge if completed
            if (moduleProgress && moduleProgress.completed) {
                const badge = document.createElement('div');
                badge.className = 'completion-badge';
                badge.innerHTML = '✓';
                badge.title = 'Completed';
                card.appendChild(badge);
                card.classList.add('completed');
            }
        });

        // Show celebration if 100% complete
        if (this.getOverallProgress() === 100) {
            this.celebrate();
        }
    },

    // Celebration animation for 100% completion
    celebrate() {
        // Only celebrate once
        if (localStorage.getItem('promptcraft_celebrated')) {
            return;
        }

        const celebration = document.createElement('div');
        celebration.className = 'celebration-modal';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h2>Congratulations!</h2>
                <p>You've completed all modules!</p>
                <p class="completion-stats">
                    ${this.getStats().totalQuizzes} quizzes passed<br>
                    ${this.getStats().completed} modules mastered
                </p>
                <button class="btn-primary" onclick="this.closest('.celebration-modal').remove()">
                    Continue Learning
                </button>
            </div>
        `;
        document.body.appendChild(celebration);

        // Mark as celebrated
        localStorage.setItem('promptcraft_celebrated', 'true');

        // Remove after 10 seconds if user doesn't click
        setTimeout(() => {
            if (celebration.parentElement) {
                celebration.remove();
            }
        }, 10000);
    }
};
