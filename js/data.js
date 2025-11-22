const MODULES_DATA = [
    {
        id: 1,
        title: "What is Prompt Engineering?",
        description: "Understand the basics of communicating with AI models and why it matters.",
        icon: "💡",
        sections: [
            {
                title: "The Art of Talking to AI",
                content: `Prompt engineering is the art and science of crafting inputs (prompts) to get the best possible outputs from Large Language Models (LLMs) like ChatGPT, Claude, and Gemini. It's not just about asking questions; it's about providing context, constraints, and format instructions.`
            },
            {
                title: "Key Concepts",
                content: `<ul>
                    <li><strong>Context:</strong> Giving the AI background information.</li>
                    <li><strong>Instruction:</strong> Telling the AI exactly what to do.</li>
                    <li><strong>Input Data:</strong> The information the AI needs to process.</li>
                    <li><strong>Output Indicator:</strong> How you want the answer formatted.</li>
                </ul>`
            }
        ],
        quiz: [
            {
                question: "What is the primary goal of prompt engineering?",
                options: [
                    "To write code for the AI",
                    "To guide the AI to produce optimal outputs",
                    "To train the AI model from scratch",
                    "To fix bugs in the AI's server"
                ],
                correct: 1
            },
            {
                question: "Which of these is NOT a key component of a prompt?",
                options: [
                    "Context",
                    "Instruction",
                    "WiFi Speed",
                    "Output Format"
                ],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        title: "Writing Clear & Effective Prompts",
        description: "Learn the golden rules of clarity, specificity, and context.",
        icon: "✨",
        sections: [
            {
                title: "Be Specific",
                content: "Vague prompts lead to vague answers. Instead of saying 'Write a story', say 'Write a 500-word sci-fi story about a robot who loves gardening'."
            },
            {
                title: "The CO-STAR Framework",
                content: `A popular framework for structure:
                <ul>
                    <li><strong>C</strong>ontext: Who are you? What is the situation?</li>
                    <li><strong>O</strong>bjective: What do you want to achieve?</li>
                    <li><strong>S</strong>tyle: Formal, casual, humorous?</li>
                    <li><strong>T</strong>one: Empathetic, professional?</li>
                    <li><strong>A</strong>udience: Who is this for?</li>
                    <li><strong>R</strong>esponse: Format (Table, List, JSON).</li>
                </ul>`
            }
        ],
        quiz: [
            {
                question: "What does the 'A' in CO-STAR stand for?",
                options: ["Action", "Audience", "Algorithm", "Answer"],
                correct: 1
            },
            {
                question: "Which prompt is better?",
                options: [
                    "Tell me about dogs.",
                    "Write a 100-word summary of the Golden Retriever breed for a 5-year-old."
                ],
                correct: 1
            }
        ]
    },
    {
        id: 3,
        title: "Prompt Patterns",
        description: "Master standard patterns like Persona, Template, and Recipe.",
        icon: "🧩",
        sections: [
            {
                title: "The Persona Pattern",
                content: "Ask the AI to act as a specific expert. Example: 'Act as a senior python developer. Review this code for security vulnerabilities.'"
            },
            {
                title: "The Template Pattern",
                content: "Provide a template for the AI to fill in. Example: 'I will give you a movie name, and you will follow this format: Title | Director | Year'."
            }
        ],
        quiz: [
            {
                question: "Which pattern involves asking the AI to adopt a specific role?",
                options: ["Template Pattern", "Persona Pattern", "Recipe Pattern", "Flipped Interaction Pattern"],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: "Role Prompting",
        description: "Deep dive into assigning roles to unlock expert knowledge.",
        icon: "🎭",
        sections: [
            {
                title: "Why Roles Matter",
                content: "Assigning a role sets the 'latent space' of the model. If you say 'Act as a lawyer', the model prioritizes legal terminology and logic."
            }
        ],
        quiz: [
            {
                question: "True or False: Assigning a role limits the AI's creativity.",
                options: ["True", "False"],
                correct: 1
            }
        ]
    },
    {
        id: 5,
        title: "Chain-of-Thought & Reasoning",
        description: "Teach the AI to think step-by-step for complex problems.",
        icon: "🔗",
        sections: [
            {
                title: "Let's Think Step by Step",
                content: "Simply adding 'Let's think step by step' can drastically improve performance on math and logic problems. This is called Zero-Shot Chain of Thought."
            }
        ],
        quiz: [
            {
                question: "What is the magic phrase for Zero-Shot Chain of Thought?",
                options: ["Abracadabra", "Let's think step by step", "Compute this", "Solve immediately"],
                correct: 1
            }
        ]
    },
    {
        id: 6,
        title: "Structured Outputs",
        description: "Get clean JSON, CSV, or Tables for your applications.",
        icon: "📊",
        sections: [
            {
                title: "JSON Mode",
                content: "Always specify the schema. Example: 'Return the result as a JSON object with keys: name, age, occupation'."
            }
        ],
        quiz: [
            {
                question: "Which format is best for programmatic use?",
                options: ["Free text", "JSON", "Poem", "ASCII Art"],
                correct: 1
            }
        ]
    },
    {
        id: 7,
        title: "Prompt Debugging & Refinement",
        description: "How to fix prompts when the AI hallucinates or fails.",
        icon: "🔧",
        sections: [
            {
                title: "Iterative Refinement",
                content: "If the output is wrong, don't just retry. Analyze WHY. Did you miss a constraint? Was the instruction ambiguous?"
            }
        ],
        quiz: [
            {
                question: "What should you do if the AI hallucinates?",
                options: ["Yell at it", "Add constraints and ask for citations", "Give up", "Refresh the page"],
                correct: 1
            }
        ]
    },
    {
        id: 8,
        title: "Building AI Agents",
        description: "Combine prompts to create autonomous workflows.",
        icon: "🤖",
        sections: [
            {
                title: "Chaining Prompts",
                content: "An agent is often just a loop of prompts: 1. Plan, 2. Execute, 3. Review, 4. Refine."
            }
        ],
        quiz: [
            {
                question: "What is a common loop for AI agents?",
                options: ["Plan-Execute-Review", "Eat-Sleep-Repeat", "Input-Output", "Start-Stop"],
                correct: 0
            }
        ]
    }
];

const RESOURCES_DATA = [
    {
        title: "Prompting Cheat Sheet",
        type: "PDF",
        link: "#"
    },
    {
        title: "Top 50 Persona Prompts",
        type: "Template",
        link: "#"
    }
];
