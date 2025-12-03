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
                title: "Why Prompt Engineering Matters",
                content: `In the age of AI, the quality of your output is directly proportional to the quality of your input. A well-crafted prompt can mean the difference between a generic response and a tailored, actionable solution. LLMs have absorbed vast knowledge, but they need precise instructions to unlock their full potential.`
            },
            {
                title: "Key Concepts",
                content: `<ul>
                    <li><strong>Context:</strong> Giving the AI background information to frame the task.</li>
                    <li><strong>Instruction:</strong> Telling the AI exactly what to do in clear, specific language.</li>
                    <li><strong>Input Data:</strong> The information the AI needs to process or transform.</li>
                    <li><strong>Output Indicator:</strong> How you want the answer formatted (list, JSON, paragraph, etc.).</li>
                    <li><strong>Constraints:</strong> Limitations like length, tone, or what to avoid.</li>
                </ul>`
            },
            {
                title: "Real-World Applications",
                content: `Prompt engineering powers countless applications: content creation, code generation, data analysis, customer support automation, research summarization, creative writing, and more. Mastering it unlocks productivity gains across all knowledge work.`
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
                title: "Be Specific and Clear",
                content: `Vague prompts lead to vague answers. Instead of "Write a story", say "Write a 500-word sci-fi story about a robot who discovers emotions while tending to a zero-gravity garden." Specificity eliminates ambiguity.`
            },
            {
                title: "The CO-STAR Framework",
                content: `A proven framework for structuring prompts:
                <ul>
                    <li><strong>C</strong>ontext: Who are you? What's the situation?</li>
                    <li><strong>O</strong>bjective: What do you want to achieve?</li>
                    <li><strong>S</strong>tyle: Formal, casual, humorous, academic?</li>
                    <li><strong>T</strong>one: Empathetic, authoritative, friendly?</li>
                    <li><strong>A</strong>udience: Who is this for? (e.g., experts, beginners, children)</li>
                    <li><strong>R</strong>esponse: Desired format (table, list, JSON, markdown)</li>
                </ul>`
            },
            {
                title: "Use Examples (Few-Shot Learning)",
                content: `Provide 2-3 examples of the desired output format. This is called "few-shot prompting" and dramatically improves accuracy. Example: "Extract entities from text. Example 1: Input: 'Apple released iPhone 15.' Output: Company: Apple, Product: iPhone 15"`
            },
            {
                title: "Set Constraints",
                content: `Tell the AI what NOT to do. Examples: "Don't use technical jargon", "Keep it under 200 words", "Avoid mentioning competitors", "Use only information from the provided text".`
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
        title: "Advanced Prompt Patterns",
        description: "Master patterns like Persona, Template, Chain-of-Thought, and more.",
        icon: "🧩",
        sections: [
            {
                title: "The Persona Pattern",
                content: `Ask the AI to adopt a specific expert role. This activates relevant knowledge and vocabulary. Examples: "Act as a senior Python developer. Review this code for security vulnerabilities." or "You are a financial advisor. Explain compound interest to a college student."`
            },
            {
                title: "The Template Pattern",
                content: `Provide a template for the AI to fill in. Example: "I will give you a movie name, and you will respond using this format: Title | Director | Year | Genre | Rating (1-5 stars)"`
            },
            {
                title: "The Recipe Pattern",
                content: `Break down complex tasks into step-by-step instructions. Example: "To analyze this dataset: 1. Identify data types, 2. Check for missing values, 3. Generate summary statistics, 4. Suggest visualizations."`
            },
            {
                title: "The Flipped Interaction Pattern",
                content: `Let the AI ask YOU questions to gather requirements. Example: "I want to build a web app. Ask me questions to understand my requirements before suggesting a tech stack."`
            },
            {
                title: "The Refinement Pattern",
                content: `Iteratively improve outputs. Start with "Draft version 1", then "Improve clarity", then "Make it more concise", then "Add examples". Each iteration refines the output.`
            }
        ],
        quiz: [
            {
                question: "Which pattern involves asking the AI to adopt a specific role?",
                options: ["Template Pattern", "Persona Pattern", "Recipe Pattern", "Flipped Interaction Pattern"],
                correct: 1
            },
            {
                question: "What is the 'Flipped Interaction Pattern'?",
                options: [
                    "Reversing the order of your instructions",
                    "Letting the AI ask you questions first",
                    "Flipping between different AI models",
                    "Turning off the AI"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: "Chain-of-Thought & Reasoning",
        description: "Teach the AI to think step-by-step for complex problems.",
        icon: "🔗",
        sections: [
            {
                title: "Zero-Shot Chain-of-Thought",
                content: `Simply adding "Let's think step by step" or "Let's approach this systematically" can drastically improve performance on math, logic, and reasoning problems. This activates the model's reasoning capabilities without providing examples.`
            },
            {
                title: "Few-Shot Chain-of-Thought",
                content: `Provide examples that show the reasoning process. Example: "Q: If a train travels 60 miles in 1 hour, how far in 3.5 hours? A: Let's think step by step. Step 1: Speed = 60 mph. Step 2: Distance = Speed × Time = 60 × 3.5 = 210 miles."`
            },
            {
                title: "Tree of Thoughts",
                content: `For complex problems, explore multiple reasoning paths. Ask the AI to "Generate 3 different approaches to solve this, then evaluate which is best." This mimics how humans brainstorm solutions.`
            },
            {
                title: "Self-Consistency",
                content: `Generate multiple reasoning paths and take a majority vote. Prompt: "Solve this problem 3 different ways, then identify the most common answer." This reduces errors.`
            }
        ],
        quiz: [
            {
                question: "What is the magic phrase for Zero-Shot Chain of Thought?",
                options: ["Abracadabra", "Let's think step by step", "Compute this", "Solve immediately"],
                correct: 1
            },
            {
                question: "What is 'Self-Consistency' in prompting?",
                options: [
                    "Making sure your prompts are always the same",
                    "Generating multiple solutions and taking a majority vote",
                    "Being consistent with your tone",
                    "Using the same AI model each time"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 5,
        title: "Structured Outputs & Data Extraction",
        description: "Get clean JSON, CSV, tables, or custom formats for your applications.",
        icon: "📊",
        sections: [
            {
                title: "JSON Mode",
                content: `Always specify the exact schema. Example: "Extract information and return as JSON with keys: {name: string, age: number, occupation: string, hobbies: array}. Ensure the output is valid JSON."`
            },
            {
                title: "CSV and Tables",
                content: `For tabular data: "Convert this text into a CSV with columns: Name, Age, City. Use commas as separators and quotes for fields containing commas."`
            },
            {
                title: "Markdown Tables",
                content: `Request: "Create a comparison table in markdown format with columns: Feature, Product A, Product B, Product C. Use | for separators and align columns."`
            },
            {
                title: "Data Validation",
                content: `Add validation rules: "Extract dates in ISO 8601 format (YYYY-MM-DD). If a date is ambiguous, include a 'confidence' field. If information is missing, use null."`
            }
        ],
        quiz: [
            {
                question: "Which format is best for programmatic use?",
                options: ["Free text", "JSON", "Poem", "ASCII Art"],
                correct: 1
            },
            {
                question: "When requesting JSON output, you should:",
                options: [
                    "Just ask for JSON",
                    "Specify the exact schema and field types",
                    "Hope for the best",
                    "Use a different AI"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 6,
        title: "Prompt Debugging & Refinement",
        description: "How to fix prompts when the AI hallucinates or fails.",
        icon: "🔧",
        sections: [
            {
                title: "Iterative Refinement",
                content: `If the output is wrong, don't just retry. Analyze WHY. Did you miss a constraint? Was the instruction ambiguous? Add specificity incrementally until you get the desired result.`
            },
            {
                title: "Combating Hallucinations",
                content: `Strategies to reduce false information: 1) Ask for citations: "Include sources for all claims", 2) Set knowledge cutoffs: "Use only info from the provided text", 3) Request confidence scores: "Rate your confidence 1-10 for each claim", 4) Use retrieval: "Search the document before answering".`
            },
            {
                title: "Testing Edge Cases",
                content: `Test your prompt with unusual inputs. What if the input is empty? What if it's in a different language? What if it contains special characters? Robust prompts handle edge cases gracefully.`
            },
            {
                title: "Prompt Versioning",
                content: `Keep track of prompt versions like code. Document what works and what doesn't. Use A/B testing to compare prompt variations on the same task.`
            }
        ],
        quiz: [
            {
                question: "What should you do if the AI hallucinates?",
                options: ["Yell at it", "Add constraints and ask for citations", "Give up", "Refresh the page"],
                correct: 1
            },
            {
                question: "Which is NOT a good practice for reducing hallucinations?",
                options: [
                    "Asking for sources",
                    "Limiting to provided information only",
                    "Making the prompt as vague as possible",
                    "Requesting confidence scores"
                ],
                correct: 2
            }
        ]
    },
    {
        id: 7,
        title: "Role Prompting & Personas",
        description: "Deep dive into assigning roles to unlock expert knowledge.",
        icon: "🎭",
        sections: [
            {
                title: "Why Roles Matter",
                content: `Assigning a role sets the 'latent space' of the model. If you say 'Act as a lawyer', the model prioritizes legal terminology, precedents, and logical structures. Roles prime the AI's response patterns.`
            },
            {
                title: "Effective Role Definitions",
                content: `Be specific about expertise level and style. Instead of "Act as a teacher", try "Act as a patient, encouraging kindergarten teacher explaining basic math concepts using simple analogies."`
            },
            {
                title: "Multi-Role Prompting",
                content: `Simulate conversations between personas. Example: "Simulate a discussion between a product manager, UX designer, and developer about this feature. Each should present their perspective."`
            },
            {
                title: "Meta-Prompting",
                content: `Ask the AI to help you create better prompts. Example: "You are an expert prompt engineer. I want to analyze customer feedback. What prompt would you suggest I use?"`
            }
        ],
        quiz: [
            {
                question: "True or False: Assigning a role limits the AI's creativity.",
                options: ["True", "False"],
                correct: 1
            },
            {
                question: "What is 'Meta-Prompting'?",
                options: [
                    "Using prompts about prompts",
                    "Very fast prompting",
                    "Prompting multiple AIs at once",
                    "Philosophical prompting"
                ],
                correct: 0
            }
        ]
    },
    {
        id: 8,
        title: "Building AI Agents & Workflows",
        description: "Combine prompts to create autonomous workflows and AI agents.",
        icon: "🤖",
        sections: [
            {
                title: "Chaining Prompts",
                content: `An agent is often a loop of prompts: 1. Plan the approach, 2. Execute the task, 3. Review the output, 4. Refine if needed. Each step uses the output of the previous step as input.`
            },
            {
                title: "ReAct Pattern (Reasoning + Acting)",
                content: `Combine reasoning and actions. Format: "Thought: [reason about what to do next], Action: [take an action like search, calculate, or call a tool], Observation: [result of action]." Repeat until task is complete.`
            },
            {
                title: "Tool Use & Function Calling",
                content: `Modern LLMs can call external tools. Example: "If you need current data, call search_web(query). If you need calculations, call calculator(expression). Available tools: [list tools and their signatures]."`
            },
            {
                title: "Memory and Context Management",
                content: `For long conversations, summarize periodically. Example: "Before continuing, summarize the key points of our discussion so far in 3 bullet points." This maintains context within token limits.`
            },
            {
                title: "Multi-Agent Systems",
                content: `Create specialized agents that collaborate. Example: Researcher agent gathers info → Analyst agent processes it → Writer agent creates report → Reviewer agent checks quality.`
            }
        ],
        quiz: [
            {
                question: "What is a common loop for AI agents?",
                options: ["Plan-Execute-Review", "Eat-Sleep-Repeat", "Input-Output", "Start-Stop"],
                correct: 0
            },
            {
                question: "What does ReAct stand for?",
                options: [
                    "Really Acting",
                    "Reasoning + Acting",
                    "React Framework",
                    "Ready to Act"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 9,
        title: "Understanding LLM Capabilities & Limitations",
        description: "Learn what LLMs can and cannot do, and how to work within constraints.",
        icon: "🧠",
        sections: [
            {
                title: "What LLMs Excel At",
                content: `<ul>
                    <li>Text generation, transformation, and summarization</li>
                    <li>Pattern recognition and classification</li>
                    <li>Language translation and code conversion</li>
                    <li>Creative writing and ideation</li>
                    <li>Explaining complex concepts in simple terms</li>
                </ul>`
            },
            {
                title: "What LLMs Struggle With",
                content: `<ul>
                    <li>Precise arithmetic (use calculators instead)</li>
                    <li>Current events (knowledge cutoff dates apply)</li>
                    <li>Factual accuracy without grounding (prone to hallucinations)</li>
                    <li>Long-term memory (context window limits)</li>
                    <li>Causal reasoning requiring real-world physics</li>
                </ul>`
            },
            {
                title: "Token Limits",
                content: `LLMs have maximum context windows (e.g., 4K, 8K, 128K tokens). A token ≈ 0.75 words. If your input + output exceeds this, the model "forgets" earlier parts. Solution: Summarize, chunk data, or use RAG (Retrieval Augmented Generation).`
            },
            {
                title: "Temperature and Sampling",
                content: `Temperature controls randomness. Low temperature (0.1-0.3) = deterministic, factual responses. High temperature (0.7-1.0) = creative, diverse outputs. Adjust based on task: Use low for data extraction, high for brainstorming.`
            }
        ],
        quiz: [
            {
                question: "Which task do LLMs struggle with most?",
                options: [
                    "Writing creative stories",
                    "Summarizing long documents",
                    "Precise multi-digit arithmetic",
                    "Translating languages"
                ],
                correct: 2
            },
            {
                question: "What happens when temperature is set very low (near 0)?",
                options: [
                    "The AI becomes more creative",
                    "The AI gives more deterministic, focused responses",
                    "The AI stops working",
                    "The AI runs faster"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 10,
        title: "Advanced Techniques: RAG, Fine-Tuning & More",
        description: "Explore cutting-edge methods to enhance LLM performance.",
        icon: "🚀",
        sections: [
            {
                title: "RAG (Retrieval Augmented Generation)",
                content: `Combine LLMs with external knowledge bases. Process: 1) User asks question, 2) System retrieves relevant documents, 3) LLM generates answer using retrieved context. This eliminates hallucinations and adds current info.`
            },
            {
                title: "Prompt Chaining vs. Long Context",
                content: `For complex tasks, you can either: A) Use one long prompt with all info (limited by context window), or B) Chain multiple shorter prompts (output of one becomes input of next). Choose based on task complexity and token limits.`
            },
            {
                title: "Fine-Tuning Basics",
                content: `When prompting isn't enough, fine-tune the model on your specific task with labeled examples (100-10,000+ examples). This adapts the model's weights to your domain. Use when consistency and specialized knowledge are critical.`
            },
            {
                title: "Prompt Caching",
                content: `For repetitive tasks, cache the system prompt and reuse it across requests. This reduces costs and latency. Many API providers support this for prompts that don't change frequently.`
            }
        ],
        quiz: [
            {
                question: "What does RAG stand for?",
                options: [
                    "Really Amazing Generation",
                    "Retrieval Augmented Generation",
                    "Random Access Generation",
                    "Rapid AI Growth"
                ],
                correct: 1
            },
            {
                question: "When should you consider fine-tuning instead of prompting?",
                options: [
                    "Never, prompting is always better",
                    "When you need specialized, consistent performance on a specific task",
                    "Only if you have millions of examples",
                    "When prompts are too expensive"
                ],
                correct: 1
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
    },
    {
        title: "CO-STAR Framework Guide",
        type: "Guide",
        link: "#"
    },
    {
        title: "JSON Schema Examples",
        type: "Code",
        link: "#"
    }
];
