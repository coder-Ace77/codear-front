import { Link } from "react-router-dom";
import Badge from "@/atoms/Badge";
import { ProblemSummary } from "@/constants/mockData";
import { TrendingUp } from "lucide-react";

interface ProblemCardProps {
  problem: ProblemSummary;
}

const ProblemCard = ({ problem }: ProblemCardProps) => {
  const difficultyVariant = problem.difficulty.toLowerCase() as "easy" | "medium" | "hard";

  return (
    <Link to={`/coding/${problem.id}`}>
      <div className="group p-5 rounded-xl bg-card border border-border hover:border-primary hover:shadow-card transition-all duration-300 cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {problem.id}. {problem.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={difficultyVariant}>{problem.difficulty}</Badge>
              {problem.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
              {problem.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{problem.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProblemCard;
