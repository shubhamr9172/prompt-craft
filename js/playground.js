class AIPlayground {
    constructor() {
        this.patterns = [
            {
                name: "Persona",
                trigger: /act as|you are a|role:/i,
                feedback: "Good job using the Persona pattern! This helps ground the AI's responses.",
                response: "I have adopted the requested persona. How can I assist you in this role today?"
            },
            {
                name: "Step-by-Step",
                trigger: /step by step|think through|chain of thought/i,
                feedback: "Excellent! 'Step-by-step' triggers Chain-of-Thought reasoning, improving logic.",
                response: "Understood. I will break down the problem into logical steps:\n1. Analyze the input.\n2. Identify key constraints.\n3. Formulate a solution.\n4. Verify the result."
            },
            {
                name: "JSON/Structured",
                trigger: /json|csv|table|format/i,
                feedback: "Specifying output format is crucial for integration. Well done.",
                response: "{\n  \"status\": \"success\",\n  \"message\": \"Here is your structured data\",\n  \"data\": []\n}"
            }
        ];

        this.defaultResponse = "That's a valid prompt, but it could be more specific. Try adding a persona or specific constraints.";
    }

    analyze(prompt) {
        const matchedPattern = this.patterns.find(p => p.trigger.test(prompt));

        if (matchedPattern) {
            return {
                response: matchedPattern.response,
                feedback: matchedPattern.feedback,
                quality: "High"
            };
        }

        if (prompt.length < 20) {
            return {
                response: "I can help with that, but could you provide more details?",
                feedback: "Your prompt is very short. Try the CO-STAR framework to add context.",
                quality: "Low"
            };
        }

        return {
            response: "Here is a generated response based on your input... [Simulated Output]",
            feedback: this.defaultResponse,
            quality: "Medium"
        };
    }
}
