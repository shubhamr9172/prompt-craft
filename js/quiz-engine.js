class QuizEngine {
    constructor() {
        this.currentQuiz = null;
        this.score = 0;
    }

    loadQuiz(moduleId) {
        const module = MODULES_DATA.find(m => m.id === moduleId);
        if (!module || !module.quiz) return null;
        return module.quiz;
    }

    checkAnswer(questionIndex, selectedOptionIndex, quizData) {
        const question = quizData[questionIndex];
        const isCorrect = question.correct === selectedOptionIndex;
        return {
            isCorrect,
            correctIndex: question.correct
        };
    }

    calculateProgress() {
        const progress = Utils.store.get('promptcraft_progress') || {};
        const totalModules = MODULES_DATA.length;
        const completedModules = Object.keys(progress).length;
        return (completedModules / totalModules) * 100;
    }

    markModuleComplete(moduleId) {
        const progress = Utils.store.get('promptcraft_progress') || {};
        progress[moduleId] = true;
        Utils.store.set('promptcraft_progress', progress);
        return this.calculateProgress();
    }
}
