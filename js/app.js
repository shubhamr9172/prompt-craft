const App = {
    init: () => {
        Progress.init(); // Initialize progress tracking
        App.router();
        window.addEventListener('hashchange', App.router);
        App.setupTheme();
        App.updateProgress();
        App.setupScrollReveal();

        // Update progress UI after init
        setTimeout(() => Progress.updateUI(), 100);
    },

    setupScrollReveal: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements with .reveal class
        // We'll need to call this again when content changes, so maybe better to expose observer or re-run
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Expose observer to UI for dynamic content
        App.observer = observer;
    },

    router: () => {
        const hash = window.location.hash || '#home';
        const [route, param] = hash.slice(1).split('/');

        // Update active nav link
        Utils.all('.nav-link').forEach(l => l.classList.remove('active'));
        const activeLink = Utils.el(`.nav-link[href="#${route}"]`);
        if (activeLink) activeLink.classList.add('active');

        switch (route) {
            case 'home':
                UI.renderHome();
                break;
            case 'modules':
                UI.renderModules();
                break;
            case 'module':
                UI.renderModuleDetail(param);
                break;
            case 'playground':
                UI.renderPlayground();
                break;
            case 'llm-concepts':
                UI.renderLLMConcepts();
                break;
            case 'llm-galaxy':
                UI.renderLLMGalaxy();
                break;
            default:
                UI.renderHome();
        }
        window.scrollTo(0, 0);
    },

    setupTheme: () => {
        const toggle = Utils.el('#theme-toggle');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        toggle.querySelector('.icon').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggle.querySelector('.icon').textContent = newTheme === 'dark' ? '🌙' : '☀️';
        });

        // Mobile Menu Logic
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const menuOverlay = document.querySelector('.mobile-menu-overlay');
        const menuLinks = document.querySelectorAll('.mobile-menu-link');

        if (menuBtn && menuOverlay) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
            });

            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuBtn.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    },

    // Playground Actions
    runSimulation: async () => {
        const input = Utils.el('#prompt-input').value;
        if (!input.trim()) return;

        const outputDiv = Utils.el('#chat-output');
        const feedbackDiv = Utils.el('#feedback-area');
        const playground = new AIPlayground();

        // User Message
        outputDiv.innerHTML += `<div class="message user animate-slide-up">${input}</div>`;
        Utils.el('#prompt-input').value = '';

        // Simulate loading
        outputDiv.innerHTML += `<div class="message ai loading"><div class="spinner"></div></div>`;
        outputDiv.scrollTop = outputDiv.scrollHeight;

        await Utils.wait(1000);

        // Remove loader
        outputDiv.querySelector('.loading').remove();

        // AI Response
        const result = playground.analyze(input);
        outputDiv.innerHTML += `<div class="message ai animate-slide-up">${result.response}</div>`;

        // Feedback
        if (result.feedback) {
            feedbackDiv.innerHTML = `<div class="feedback-box animate-fade-in"><strong>Feedback:</strong> ${result.feedback}</div>`;
        }

        outputDiv.scrollTop = outputDiv.scrollHeight;
    },

    clearPlayground: () => {
        Utils.el('#chat-output').innerHTML = '<div class="message ai">Ready to help! Enter a prompt to see how I respond.</div>';
        Utils.el('#feedback-area').innerHTML = '';
    },

    // Quiz Actions
    startQuiz: (moduleId) => {
        const engine = new QuizEngine();
        const questions = engine.loadQuiz(moduleId);
        const container = Utils.el('#quiz-container');

        let currentQ = 0;
        let score = 0;

        const renderQuestion = () => {
            if (currentQ >= questions.length) {
                // Quiz Complete - Save score to progress
                const passed = score === questions.length;

                // Save quiz score using Progress system
                Progress.saveQuizScore(moduleId, score, questions.length);

                if (passed) engine.markModuleComplete(moduleId);
                App.updateProgress();

                container.innerHTML = `
                    <div class="text-center animate-fade-in">
                        <h3>Quiz Complete!</h3>
                        <p>You scored ${score}/${questions.length}</p>
                        ${passed ?
                        `<div style="color: var(--success); margin-bottom: 1rem;">🎉 Module Completed!</div>
                             <a href="#modules" class="btn btn-primary">Next Module</a>` :
                        `<div style="color: var(--error); margin-bottom: 1rem;">Try again to complete the module.</div>
                             <button class="btn btn-secondary" onclick="App.startQuiz(${moduleId})">Retry</button>`
                    }
                    </div>
                `;
                return;
            }

            const q = questions[currentQ];
            container.innerHTML = `
                <div class="animate-fade-in">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                        <span>Question ${currentQ + 1}/${questions.length}</span>
                        <span>Score: ${score}</span>
                    </div>
                    <h3 style="margin-bottom: 1.5rem;">${q.question}</h3>
                    <div class="options">
                        ${q.options.map((opt, i) => `
                            <button class="quiz-option" onclick="App.handleAnswer(${moduleId}, ${currentQ}, ${i})">${opt}</button>
                        `).join('')}
                    </div>
                </div>
            `;
        };

        App.handleAnswer = (mId, qIdx, aIdx) => {
            const result = engine.checkAnswer(qIdx, aIdx, questions);
            const options = Utils.all('.quiz-option');

            options.forEach((btn, i) => {
                btn.disabled = true;
                if (i === result.correctIndex) btn.classList.add('correct');
                if (i === aIdx && !result.isCorrect) btn.classList.add('incorrect');
            });

            if (result.isCorrect) score++;

            setTimeout(() => {
                currentQ++;
                renderQuestion();
            }, 1500);
        };

        renderQuestion();
    },

    updateProgress: () => {
        const engine = new QuizEngine();
        const percent = engine.calculateProgress();
        UI.updateGlobalProgress(percent);
    }
};

// Start the app
document.addEventListener('DOMContentLoaded', App.init);
