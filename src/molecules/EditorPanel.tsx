import { useEffect, useState } from "react";
import { Play, CheckCircle } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { getButtonClasses } from "@/constants/ButtonVariants";
import { codingService } from "@/service/codingService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const EditorPanel = ({ code, setCode, problemId }) => {
  const [language, setLanguage] = useState("python");
  const [fontSize, setFontSize] = useState(14);
  const [output, setOutput] = useState("Click 'Run' or 'Submit' to see results...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(typeof code==='string' && code.length>0){
      localStorage.setItem("p"+problemId,code);
    }
  },[code,problemId]);

  useEffect(()=>{
    const savedCode = localStorage.getItem("p"+problemId);
    if(savedCode && savedCode!==code){
      setCode(savedCode);
    }
  },[problemId,setCode]);


  const editorLanguage = {
    javascript: "javascript",
    python: "python",
    java: "java",
    cpp: "cpp",
    go: "go",
  }[language];

  const handleSubmit = async () => {
    
    try {

      toast.success("Code submitted successfully");
      setIsSubmitting(true);
      setOutput("Submitting code...");
      console.log("code is submitting..");

      console.log(problemId);

      const { submissionId } = await codingService.submitCode(
        problemId,
        code,
        language
      );

      console.log(`Submission ID: ${submissionId}`);
      setOutput(`Submission ID: ${submissionId}\nWaiting for result...`);

      navigate(`/submissions/${submissionId}`);

    } catch (err) {

      console.error(err);
      setOutput("❌ Error submitting code. Please try again.");
      toast.error("Error submitting code. Please try again");
      setIsSubmitting(false); 

    } 
  };

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

          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
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
          <button className={getButtonClasses("secondary")} disabled>
            <Play className="w-4 h-4 mr-1" />
            Run
          </button>

          <button
            className={getButtonClasses("accent")}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            {isSubmitting ? "Submitting..." : "Submit"}
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
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
          {output}
        </pre>
      </div>
    </div>
  );
};

export default EditorPanel;
