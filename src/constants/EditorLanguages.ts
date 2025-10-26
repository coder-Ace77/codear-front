
export const getLangOptions = (language)=>{
    return {
    javascript: "javascript",
    python: "python",
    java: "java",
    cpp: "cpp",
    go: "go",
  }[language];
}