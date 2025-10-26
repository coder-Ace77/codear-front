import { useState } from "react";
import Select from "@/atoms/Select";
import Button from "@/atoms/Button";
import { Play, CheckCircle } from "lucide-react";

const EditorPanel = () => {
  const [code, setCode] = useState(`function twoSum(nums, target) {\n  // Write your solution here\n  \n}`);
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary">
        <div className="flex items-center gap-3">
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-40"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
          <Button variant="accent" size="sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Submit
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          {/* Line Numbers */}
          <div className="w-12 bg-secondary border-r border-border text-muted-foreground text-sm font-mono pt-4 px-2 select-none">
            {code.split('\n').map((_, i) => (
              <div key={i} className="text-right pr-2">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-transparent text-foreground font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Output Panel */}
      <div className="h-32 border-t border-border bg-secondary p-4">
        <div className="text-sm font-medium text-muted-foreground mb-2">Output</div>
        <div className="text-sm font-mono text-foreground">
          Click "Run" or "Submit" to see results...
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
