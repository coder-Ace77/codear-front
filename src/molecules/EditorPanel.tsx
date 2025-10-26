import { useState } from "react";
import { Play, CheckCircle } from "lucide-react";
import { Editor } from "@monaco-editor/react"; 
import { getButtonClasses } from "@/constants/ButtonVariants";

const EditorPanel = ({ code, setCode }) => {
  const [language, setLanguage] = useState("javascript");
  const [fontSize,setFontSize] = useState(14);

  const editorLanguage = {
    javascript: "javascript",
    python: "python",
    java: "java",
    cpp: "cpp",
    go: "go",
  }[language];

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary">
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-40 h-9 px-3 rounded-md border border-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
          </select>

          <select value={fontSize} onChange={(e)=>setFontSize(Number(e.target.value))}
            className="w-20 h-9 px-3 rounded-md border border-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"            
            >
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <button className={getButtonClasses("secondary")}>
            <Play className="w-4 h-4 mr-1" />
            Run
          </button>
          <button className={getButtonClasses("accent")}>
            <CheckCircle className="w-4 h-4 mr-1" />
            Submit
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <Editor
          height="100%"
          width="100%"
          language={editorLanguage}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          loading="Loading editor..."
          options={{
            automaticLayout: true,
            selectOnLineNumbers: true,
            fontSize: fontSize,
            fontFamily: "monospace",
          }}
        />
      </div>

      <div className="h-32 border-t border-border bg-secondary p-4 overflow-y-auto">
        <div className="text-sm font-medium text-muted-foreground mb-2">Output</div>
        <div className="text-sm font-mono text-foreground">
          Click "Run" or "Submit" to see results...
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;