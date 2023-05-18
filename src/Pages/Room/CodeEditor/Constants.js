export const fontSizes = [12, 14, 16, 18, 20, 22, 24];

export const themes = [
    "chaos",
    "cobalt",
    "dracula",
    "github_dark",
    "merbivore_soft",
    "monokai",
    "nord_dark",
    "one_dark",
    "textmate",
    "tomorrow_night_blue",
    "tomorrow_night_eighties",
    "tomorrow_night",
    "xcode",
];

export const languages = ["c_cpp", "java", "javascript", "python", "kotlin"];

export const getLanguageDisplayNameFromMode = (language) => {
    const map = {
        c_cpp: "C++",
        java: "Java",
        javascript: "JavaScript",
        python: "Python",
        kotlin: "Kotlin",
    };
    return map[language];
};
