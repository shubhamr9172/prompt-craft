const UI = {
    renderHome: () => {
        const content = Utils.el('#app-content');
        content.innerHTML = `
            <section class="hero animate-fade-in">
                <div class="container">
                    <h1>Master <span style="background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Prompt Engineering</span></h1>
                    <p style="font-size: 1.2rem; max-width: 600px; color: var(--text-muted);">
                        The interactive way to learn. Practice with a simulated AI, take quizzes, and earn your certification.
                    </p>
                    <div style="display: flex; gap: var(--space-md); margin-top: var(--space-lg);">
                        <a href="#modules" class="btn btn-primary">Start Learning</a>
                        <a href="#playground" class="btn btn-secondary">Try Playground</a>
                    </div>
                </div>
            </section>

            <section class="container" style="margin-top: var(--space-xl);">
                <h2 class="animate-slide-up delay-1">Learning Modules</h2>
                <div class="grid-3 animate-slide-up delay-2" id="modules-grid">
                    ${MODULES_DATA.map(module => UI.components.moduleCard(module)).join('')}
                </div>
            </section>
        `;
    },

    renderModules: () => {
        const content = Utils.el('#app-content');
        content.innerHTML = `
            <div class="container animate-fade-in">
                <h1>All Modules</h1>
                <div class="grid-3" style="margin-top: var(--space-lg);">
                    ${MODULES_DATA.map(module => UI.components.moduleCard(module)).join('')}
                </div>
            </div>
        `;
    },

    renderModuleDetail: (id) => {
        const module = MODULES_DATA.find(m => m.id === parseInt(id));
        if (!module) return UI.renderHome();

        const content = Utils.el('#app-content');
        content.innerHTML = `
            <div class="container animate-fade-in">
                <a href="#modules" style="display: inline-block; margin-bottom: var(--space-md);">&larr; Back to Modules</a>
                <div class="module-layout">
                    <aside class="module-sidebar">
                        <h3>${module.title}</h3>
                        <div class="progress-bar" style="margin: var(--space-sm) 0;">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <nav>
                            ${module.sections.map((s, i) => `
                                <a class="sidebar-item ${i === 0 ? 'active' : ''}" onclick="UI.scrollToSection(${i})">${s.title}</a>
                            `).join('')}
                            <a class="sidebar-item" onclick="UI.scrollToSection('quiz')">Quiz</a>
                        </nav>
                    </aside>
                    <div class="module-content">
                        <h1>${module.title}</h1>
                        <p class="lead">${module.description}</p>
                        
                        ${module.sections.map((section, i) => `
                            <div id="section-${i}" style="margin-bottom: var(--space-xl);">
                                <h2>${section.title}</h2>
                                <div class="content-body">${section.content}</div>
                            </div>
                        `).join('')}

                        <div id="section-quiz" class="card" style="margin-top: var(--space-xl);">
                            <h2>Knowledge Check</h2>
                            <div id="quiz-container">
                                <button class="btn btn-primary" onclick="App.startQuiz(${module.id})">Start Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderPlayground: () => {
        const content = Utils.el('#app-content');
        content.innerHTML = `
            <div class="container animate-fade-in" style="height: 100%;">
                <h1 style="margin-bottom: var(--space-md);">AI Playground</h1>
                <div class="playground-container">
                    <div class="playground-panel">
                        <div class="input-group">
                            <label class="input-label">Your Prompt</label>
                            <textarea id="prompt-input" placeholder="Type your prompt here... e.g., 'Act as a historian...'"></textarea>
                        </div>
                        <div style="display: flex; gap: var(--space-sm);">
                            <button class="btn btn-primary" onclick="App.runSimulation()">Generate</button>
                            <button class="btn btn-secondary" onclick="App.clearPlayground()">Clear</button>
                        </div>
                    </div>
                    <div class="playground-panel">
                        <label class="input-label">AI Output (Simulated)</label>
                        <div id="chat-output" class="chat-window">
                            <div class="message ai">Ready to help! Enter a prompt to see how I respond.</div>
                        </div>
                        <div id="feedback-area"></div>
                    </div>
                </div>
            </div>
        `;
    },

    renderLLMConcepts: () => {
        const content = Utils.el('#app-content');
        content.innerHTML = `
            <div class="llm-viz-container">
                <!-- Header -->
                <div class="llm-viz-header">
                    <h1>🤖 Understanding Large Language Models</h1>
                    <p class="subtitle">Interactive Visualizations of AI Concepts</p>
                </div>

                <!-- Scenario Selector -->
                <div class="llm-scenario-selector">
                    <button class="llm-scenario-btn active" data-scenario="sunset" onclick="LLMViz.switchScenario('sunset')">
                        <span>🌅 The Librarian</span>
                    </button>
                    <button class="llm-scenario-btn" data-scenario="tokens" onclick="LLMViz.switchScenario('tokens')">
                        <span>🔤 Token Prediction</span>
                    </button>
                    <button class="llm-scenario-btn" data-scenario="context" onclick="LLMViz.switchScenario('context')">
                        <span>📚 Context Window</span>
                    </button>
                    <button class="llm-scenario-btn" data-scenario="temperature" onclick="LLMViz.switchScenario('temperature')">
                        <span>🌡️ Temperature & Creativity</span>
                    </button>
                    <button class="llm-scenario-btn" data-scenario="hallucination" onclick="LLMViz.switchScenario('hallucination')">
                        <span>⚠️ Hallucinations</span>
                    </button>
                </div>

                <!-- Main Content -->
                <div class="llm-split-view">
                    <!-- Content will be dynamically loaded here -->
                </div>
            </div>
        `;

        // Initial render
        setTimeout(() => {
            const container = document.querySelector('.llm-split-view');
            LLMViz.renderScenario('sunset', container);
        }, 10);
    },

    renderLLMGalaxy: () => {
        const content = Utils.el('#app-content');
        content.innerHTML = `
            <div style="width: 100%; height: calc(100vh - 80px); position: relative;">
                <iframe 
                    src="llm_galaxy.html" 
                    style="width: 100%; height: 100%; border: none; display: block;"
                    title="LLM Galaxy Masterclass"
                ></iframe>
            </div>
        `;
    },

    components: {
        moduleCard: (module) => {
            const isComplete = (Utils.store.get('promptcraft_progress') || {})[module.id];
            return `
                <div class="card module-card">
                    <div class="module-icon">${module.icon}</div>
                    <h3>${module.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">${module.description}</p>
                    <div class="module-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${isComplete ? '100%' : '0%'}"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.8rem; color: var(--text-muted);">${isComplete ? 'Completed' : '0% Complete'}</span>
                            <a href="#module/${module.id}" class="btn btn-sm btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">${isComplete ? 'Review' : 'Start'}</a>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    scrollToSection: (index) => {
        const id = index === 'quiz' ? 'section-quiz' : `section-${index}`;
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    },

    updateGlobalProgress: (percent) => {
        const circle = document.querySelector('.progress-ring__circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;

        document.getElementById('global-progress-text').textContent = `${Math.round(percent)}%`;
    }
};
