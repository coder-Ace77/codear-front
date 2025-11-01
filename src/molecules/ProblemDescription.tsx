import Badge from "@/atoms/Badge";
import { Clock, Database } from "lucide-react";
import { Problem } from "@/types/problem";

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const difficultyVariant = problem.difficulty.toLowerCase() as "easy" | "medium" | "hard";
  const sampleTestCase = problem.testCases?.find(tc => tc.isSample);
  const constraintItems = problem.constraints
    ? problem.constraints.split('\n').filter(line => line.trim() !== '')
    : [];

  return (
    <div className="p-6"> 
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
  );
};

export default ProblemDescription;