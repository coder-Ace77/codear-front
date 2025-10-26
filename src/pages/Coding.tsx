import { useParams } from "react-router-dom";
import EditorPanel from "@/molecules/EditorPanel";
import Badge from "@/atoms/Badge";
import { mockProblems } from "@/constants/mockData";
import { Clock, CheckCircle2 } from "lucide-react";

const Coding = () => {
  const { id } = useParams();
  const problem = mockProblems.find((p) => p.id === Number(id)) || mockProblems[0];
  const difficultyVariant = problem.difficulty.toLowerCase() as "easy" | "medium" | "hard";

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-4 p-4">
      {/* Problem Description Panel */}
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
              <p className="text-muted-foreground leading-relaxed">
                {problem.description || "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Examples</h2>
              <div className="bg-secondary rounded-lg p-4 font-mono text-sm space-y-2">
                <div>
                  <div className="text-muted-foreground">Input:</div>
                  <div className="text-foreground">nums = [2,7,11,15], target = 9</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Output:</div>
                  <div className="text-foreground">[0,1]</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Explanation:</div>
                  <div className="text-foreground">Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Constraints</h2>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>2 ≤ nums.length ≤ 10⁴</li>
                <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                <li>-10⁹ ≤ target ≤ 10⁹</li>
                <li>Only one valid answer exists</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{problem.acceptanceRate}% Acceptance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{problem.solvedBy.toLocaleString()} submissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="lg:w-3/5 h-full">
        <EditorPanel />
      </div>
    </div>
  );
};

export default Coding;
