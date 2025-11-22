const Utils = {
    // Local Storage Wrapper
    store: {
        get: (key) => JSON.parse(localStorage.getItem(key)),
        set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        remove: (key) => localStorage.removeItem(key)
    },

    // DOM Helper
    el: (selector) => document.querySelector(selector),
    all: (selector) => document.querySelectorAll(selector),

    // Formatters
    formatPercent: (num) => `${Math.round(num)}%`,

    // Random ID
    uid: () => Date.now().toString(36) + Math.random().toString(36).substr(2),

    // Delay simulation
    wait: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};
