import { Loader2 } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import ProblemCard from "./ProblemCard";

const ExplorePageProblemSection = ({loading,problemsummary,error})=>{
    return (
        <div className="grid gap-4 mb-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Loading problems...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center py-12 bg-slate-900 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-xl font-medium text-red-700 dark:text-red-400">An error occurred</p>
              <p className="text-muted-foreground mt-1">{error}</p>
            </div>
          ) : problemsummary.length > 0 ? (
            problemsummary.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/20 rounded-lg">
              <p className="text-xl text-muted-foreground">No problems found matching your criteria</p>
            </div>
          )}
        </div>
    );
}

export default ExplorePageProblemSection;