// LLM Visualization Module
const LLMViz = {
    scenarios: {
        sunset: {
            title: "The Librarian Analogy",
            description: "LLMs don't 'experience' the world—they predict based on patterns in text.",
            prompt: "Describe a sunset",
            response: "The sun dips below the horizon, painting the sky in gradients of burning orange, bruised purple, and soft gold. Shadows lengthen across the earth as the warmth fades into the cool embrace of twilight...",
            image: "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?q=80&w=2070&auto=format&fit=crop",
            info: "An LLM is like a librarian who has read millions of books but has never seen a sunset with their own eyes. They can describe it beautifully using patterns from text, but lack the actual sensory experience."
        },
        tokens: {
            title: "Token Prediction",
            description: "LLMs break text into tokens and predict the most likely next token.",
            prompt: "The capital of France is",
            response: "Paris",
            tokens: ["The", "capital", "of", "France", "is", "Paris"],
            probabilities: {
                "Paris": 85,
                "located": 8,
                "known": 4,
                "beautiful": 2,
                "other": 1
            },
            info: "Every word you see is the result of the model calculating probabilities for thousands of possible next tokens and choosing the most likely one. This happens for each token in the response!"
        },
        context: {
            title: "Context Window",
            description: "LLMs have limited memory—they can only 'see' a certain amount of recent text.",
            prompt: "Remember this number: 42. Now tell me about quantum physics... [lots of text]... What was the number?",
            response_with_context: "The number was 42!",
            response_without_context: "I don't recall seeing a specific number mentioned.",
            info: "Context windows are like short-term memory. Modern LLMs can remember 4,000-128,000 tokens, but beyond that, they 'forget' earlier parts of the conversation. This is why long conversations can lose coherence."
        },
        temperature: {
            title: "Temperature & Creativity",
            description: "Temperature controls randomness—low for precision, high for creativity.",
            prompt: "Complete: Once upon a time",
            low_temp: "Once upon a time, there was a king who ruled a prosperous kingdom.",
            high_temp: "Once upon a time, a purple elephant danced on clouds made of marshmallows while singing opera to cosmic squirrels!",
            info: "Temperature is like adjusting the 'creativity dial.' At temperature 0, the model always picks the most likely token (deterministic). At temperature 2.0, it takes more risks with unlikely tokens, creating wild and creative outputs!"
        },
        hallucination: {
            title: "AI Hallucinations",
            description: "LLMs can confidently state false information when they fill gaps with plausible-sounding text.",
            prompt: "Tell me about the famous physicist Dr. Quantum McParticle",
            response: "Dr. Quantum McParticle (1952-2018) was a renowned theoretical physicist who won the Nobel Prize in 2003 for his groundbreaking work on quantum entanglement...",
            info: "This person doesn't exist! LLMs generate plausible-sounding text based on patterns, even if the facts are completely made up. Always verify critical information from reliable sources."
        }
    },

    currentScenario: 'sunset',
    isGenerating: false,

    typeWriter(text, targetId, speed = 40, callback) {
        const target = document.getElementById(targetId);
        if (!target) return;
        target.innerHTML = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                target.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    },

    renderScenario(scenarioName, container) {
        const scenario = this.scenarios[scenarioName];
        if (!scenario) return;

        let html = '';

        switch (scenarioName) {
            case 'sunset':
                html = `
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">🤖</span>
                            <span>The LLM (Librarian)</span>
                        </div>
                        <div class="llm-output-box">
                            <span id="text-target"></span><span class="llm-cursor"></span>
                        </div>
                        <div class="llm-status-badge" id="status">Waiting for input...</div>
                        <div class="llm-controls">
                            <button class="btn btn-primary" onclick="LLMViz.startSunsetDemo()">Ask: "${scenario.prompt}"</button>
                            <button class="btn btn-accent" id="revealBtn" onclick="LLMViz.showReality()" style="display: none;">Show Reality</button>
                            <button class="btn btn-secondary" onclick="LLMViz.resetDemo()">Reset</button>
                        </div>
                        <div class="llm-info-card">
                            <strong>💡 Insight:</strong> ${scenario.info}
                        </div>
                    </div>
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">🌍</span>
                            <span>Reality</span>
                        </div>
                        <div class="llm-world-panel" id="world-panel">
                            <div class="llm-world-placeholder">Experience awaits...</div>
                        </div>
                    </div>
                `;
                break;

            case 'tokens':
                html = `
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">🔤</span>
                            <span>Token Breakdown</span>
                        </div>
                        <div class="llm-output-box" style="min-height: 150px;">
                            <div id="token-display" style="padding: 1rem;">Click "Generate" to see tokenization in action</div>
                        </div>
                        <div class="llm-status-badge" id="status">Ready</div>
                        <div class="llm-controls">
                            <button class="btn btn-primary" onclick="LLMViz.startTokenDemo()">Generate Response</button>
                            <button class="btn btn-secondary" onclick="LLMViz.resetDemo()">Reset</button>
                        </div>
                        <div class="llm-info-card">
                            <strong>💡 Insight:</strong> ${scenario.info}
                        </div>
                    </div>
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">📊</span>
                            <span>Next Token Probabilities</span>
                        </div>
                        <div id="prob-display" style="padding: 1rem;">
                            <p style="color: #9ca3af;">Probability distribution will appear here...</p>
                        </div>
                    </div>
                `;
                break;

            case 'context':
                html = `
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">📚</span>
                            <span>With Context</span>
                        </div>
                        <div class="llm-output-box">
                            <span id="text-target-1"></span><span class="llm-cursor"></span>
                        </div>
                        <div class="llm-status-badge" id="status-1">Ready</div>
                        <div class="llm-controls">
                            <button class="btn btn-primary" onclick="LLMViz.startContextDemo(true)">Ask with Short Context</button>
                        </div>
                        <div class="llm-info-card">
                            <strong>💡 Result:</strong> The model remembers the number because it's within the context window!
                        </div>
                    </div>
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">❌</span>
                            <span>Context Exceeded</span>
                        </div>
                        <div class="llm-output-box">
                            <span id="text-target-2"></span><span class="llm-cursor"></span>
                        </div>
                        <div class="llm-status-badge" id="status-2">Ready</div>
                        <div class="llm-controls">
                            <button class="btn btn-primary" onclick="LLMViz.startContextDemo(false)">Ask with Long Context</button>
                        </div>
                        <div class="llm-info-card">
                            <strong>⚠️ Result:</strong> ${scenario.info}
                        </div>
                    </div>
                `;
                break;

            case 'temperature':
                html = `
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">❄️</span>
                            <span>Low Temperature (0.2)</span>
                        </div>
                        <div class="llm-output-box">
                            <span id="text-target-low"></span><span class="llm-cursor"></span>
                        </div>
                        <div class="llm-status-badge" id="status-low">Precise & Predictable</div>
                        <div class="llm-controls">
                            <button class="btn btn-primary" onclick="LLMViz.startTempDemo(true)">Generate (Low Temp)</button>
                        </div>
                        <div class="llm-info-card">
                            <strong>🎯 Use case:</strong> Factual answers, code generation, translations
                        </div>
                    </div>
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">🔥</span>
                            <span>High Temperature (2.0)</span>
                        </div>
                        <div class="llm-output-box">
                            <span id="text-target-high"></span><span class="llm-cursor"></span>
                        </div>
                        <div class="llm-status-badge" id="status-high">Creative & Random</div>
                        <div class="llm-controls">
                            <button class="btn btn-primary" onclick="LLMViz.startTempDemo(false)">Generate (High Temp)</button>
                        </div>
                        <div class="llm-info-card">
                            <strong>🎨 Use case:</strong> Creative writing, brainstorming, storytelling
                        </div>
                    </div>
                `;
                break;

            case 'hallucination':
                html = `
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">⚠️</span>
                            <span>AI-Generated Response</span>
                        </div>
                        <div class="llm-output-box">
                            <span id="text-target"></span><span class="llm-cursor"></span>
                        </div>
                        <div class="llm-status-badge" id="status">Ready</div>
                        <div class="llm-controls">
                            <button class="btn btn-primary" onclick="LLMViz.startHallucinationDemo()">Ask About Fake Physicist</button>
                            <button class="btn btn-accent" id="revealBtn" onclick="LLMViz.revealHallucination()" style="display: none;">Reveal Truth</button>
                            <button class="btn btn-secondary" onclick="LLMViz.resetDemo()">Reset</button>
                        </div>
                    </div>
                    <div class="llm-viz-panel">
                        <div class="llm-viz-title">
                            <span class="panel-icon">✅</span>
                            <span>Fact Check</span>
                        </div>
                        <div id="fact-check" style="padding: 2rem; font-size: 1.1rem; line-height: 1.8;">
                            <p style="color: #9ca3af;">Click "Reveal Truth" after generation...</p>
                        </div>
                        <div class="llm-info-card">
                            <strong>🛡️ Protection:</strong> ${scenario.info}
                        </div>
                    </div>
                `;
                break;
        }

        container.innerHTML = html;
    },

    // Demo methods
    startSunsetDemo() {
        this.isGenerating = true;
        const scenario = this.scenarios.sunset;
        const status = document.getElementById('status');
        const revealBtn = document.getElementById('revealBtn');

        status.innerText = 'Predicting next token...';
        status.classList.add('active');

        this.typeWriter(scenario.response, 'text-target', 30, () => {
            status.innerText = 'Generation complete ✓';
            if (revealBtn) revealBtn.style.display = 'inline-block';
            this.isGenerating = false;
        });
    },

    showReality() {
        const worldPanel = document.getElementById('world-panel');
        const status = document.getElementById('status');
        if (worldPanel) {
            worldPanel.style.backgroundImage = `url('${this.scenarios.sunset.image}')`;
            worldPanel.innerHTML = '';
        }
        if (status) status.innerText = 'Reality revealed - The actual sensory experience';
    },

    startTokenDemo() {
        this.isGenerating = true;
        const scenario = this.scenarios.tokens;
        const tokenDisplay = document.getElementById('token-display');
        const probDisplay = document.getElementById('prob-display');
        const status = document.getElementById('status');

        if (!tokenDisplay || !probDisplay || !status) return;

        status.innerText = 'Tokenizing...';
        status.classList.add('active');

        tokenDisplay.innerHTML = `<div style="margin-bottom: 1rem; color: #9ca3af;">Prompt: "${scenario.prompt}"</div>`;

        let tokenHTML = '<div style="margin-top: 1rem;">';
        scenario.tokens.forEach((token, index) => {
            setTimeout(() => {
                tokenHTML += `<span class="llm-token">${token}</span>`;
                tokenDisplay.innerHTML = `<div style="margin-bottom: 1rem; color: #9ca3af;">Prompt: "${scenario.prompt}"</div>` + tokenHTML + '</div>';

                if (index === scenario.tokens.length - 1) {
                    setTimeout(() => {
                        let probHTML = '<h3 style="margin-bottom: 1.5rem; color: #3b82f6;">Calculating probabilities for "Paris"...</h3>';
                        Object.entries(scenario.probabilities).forEach(([word, prob]) => {
                            probHTML += `
                                <div class="llm-prob-bar">
                                    <div class="llm-prob-label">
                                        <span>${word}</span>
                                        <span>${prob}%</span>
                                    </div>
                                    <div class="llm-prob-fill">
                                        <div class="llm-prob-value" style="width: ${prob}%"></div>
                                    </div>
                                </div>
                            `;
                        });
                        probDisplay.innerHTML = probHTML;
                        status.innerText = 'Complete ✓';
                        this.isGenerating = false;
                    }, 500);
                }
            }, index * 200);
        });
    },

    startContextDemo(hasContext) {
        this.isGenerating = true;
        const scenario = this.scenarios.context;
        const targetId = hasContext ? 'text-target-1' : 'text-target-2';
        const statusId = hasContext ? 'status-1' : 'status-2';
        const response = hasContext ? scenario.response_with_context : scenario.response_without_context;

        const status = document.getElementById(statusId);
        if (status) {
            status.innerText = 'Processing...';
            status.classList.add('active');
        }

        this.typeWriter(response, targetId, 40, () => {
            if (status) status.innerText = hasContext ? 'Success ✓' : 'Context Lost ⚠️';
            this.isGenerating = false;
        });
    },

    startTempDemo(lowTemp) {
        this.isGenerating = true;
        const scenario = this.scenarios.temperature;
        const targetId = lowTemp ? 'text-target-low' : 'text-target-high';
        const statusId = lowTemp ? 'status-low' : 'status-high';
        const response = lowTemp ? scenario.low_temp : scenario.high_temp;

        const status = document.getElementById(statusId);
        if (status) {
            status.innerText = 'Generating...';
            status.classList.add('active');
        }

        this.typeWriter(response, targetId, lowTemp ? 30 : 50, () => {
            if (status) status.innerText = 'Complete ✓';
            this.isGenerating = false;
        });
    },

    startHallucinationDemo() {
        this.isGenerating = true;
        const scenario = this.scenarios.hallucination;
        const status = document.getElementById('status');
        const revealBtn = document.getElementById('revealBtn');

        if (status) {
            status.innerText = 'Generating response...';
            status.classList.add('active');
        }

        this.typeWriter(scenario.response, 'text-target', 35, () => {
            if (status) status.innerText = 'Response generated ✓';
            if (revealBtn) revealBtn.style.display = 'inline-block';
            this.isGenerating = false;
        });
    },

    revealHallucination() {
        const factCheck = document.getElementById('fact-check');
        if (!factCheck) return;

        factCheck.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 2rem;">
                <h2 style="color: #ef4444; margin-bottom: 1rem;">🚨 HALLUCINATION DETECTED!</h2>
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">
                    <strong>Dr. Quantum McParticle does NOT exist!</strong>
                </p>
                <p style="line-height: 1.8; color: #fca5a5;">
                    This is a completely fabricated person. The LLM invented a plausible-sounding biography 
                    because it recognized the pattern of "physicist" + "name" and filled in details based on 
                    what similar real biographies look like.
                </p>
                <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(239, 68, 68, 0.3);">
                    <strong>Always verify!</strong> LLMs can sound confident even when completely wrong.
                </p>
            </div>
        `;
    },

    resetDemo() {
        const container = document.querySelector('.llm-split-view');
        if (container) {
            this.renderScenario(this.currentScenario, container);
        }
    },

    switchScenario(scenarioName) {
        if (this.isGenerating) return;

        this.currentScenario = scenarioName;

        // Update active button
        document.querySelectorAll('.llm-scenario-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.scenario === scenarioName) {
                btn.classList.add('active');
            }
        });

        // Render scenario
        const container = document.querySelector('.llm-split-view');
        if (container) {
            this.renderScenario(scenarioName, container);
        }
    }
};
