import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorPanel from "@/molecules/EditorPanel";
import Badge from "@/atoms/Badge";
import { Clock, Loader2, AlertTriangle, Database } from "lucide-react"; 
import { Problem , TestCase } from "@/types/problem"; 
import { fetchProblem } from "@/service/codingService";
import CodingLoading from "@/atoms/CodifingLoading";
import CodingError from "@/atoms/CodingError";
import CodingProblemNotFound from "@/atoms/CodingProblemNotFound";

const Coding = () => {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code,setCode] = useState<string | "">("");

  useEffect(() => {
    if (!id) return;
    fetchProblem(
    setLoading,
    setError,
    setProblem,
    id,
    );
  }, [id]);

  useEffect(()=>{
    console.log("CODE::"+code);
  },[code]);

  if (loading){return <CodingLoading/>}
  if (error) {return <CodingError error={error}/>}
  if (!problem) {return <CodingProblemNotFound/>}

  const difficultyVariant = problem.difficulty.toLowerCase() as "easy" | "medium" | "hard";
  const sampleTestCase = problem.testCases?.find(tc => tc.isSample);
  const constraintItems = problem.constraints
    ? problem.constraints.split('\n').filter(line => line.trim() !== '')
    : [];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-4 p-4">
      <div className="lg:w-2/5 flex flex-col h-full overflow-hidden">
        <div className="bg-card border border-border rounded-xl p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-bold">
              {problem.id}. {problem.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Badge variant={difficultyVariant}>{problem.difficulty}</Badge>
            {problem.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {problem.description}
              </p>
            </div>

            {sampleTestCase && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Example</h2>
                <div className="bg-secondary rounded-lg p-4 font-mono text-sm space-y-3">
                  <div>
                    <div className="text-muted-foreground font-sans font-semibold">Input:</div>
                    <pre className="text-foreground whitespace-pre-wrap mt-1">{sampleTestCase.input}</pre>
                  </div>
                  <div>
                    <div className="text-muted-foreground font-sans font-semibold">Output:</div>
                    <pre className="text-foreground whitespace-pre-wrap mt-1">{sampleTestCase.output}</pre>
                  </div>
                  
                  {problem.inputDescription && (
                    <div className="font-sans pt-2">
                      <p className="text-muted-foreground">{problem.inputDescription}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-3">Constraints</h2>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                {constraintItems.map((constraint, index) => (
                  <li key={index} className="font-mono">{constraint}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Time Limit: {problem.timeLimitMs} ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Memory Limit: {problem.memoryLimitMb} MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-3/5 h-full">
        <EditorPanel code={code} setCode={setCode}/>
      </div>
    </div>
  );
};

export default Coding;