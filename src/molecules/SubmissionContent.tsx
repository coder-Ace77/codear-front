import { useEffect, useState } from "react";
import type { Submission, SubmissionStatus } from "@/types/submission"; // Assumes types are in this file
import apiClient from "@/lib/apiClient";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  CheckCircle,
  Loader2,
  ChevronDown,
  Code,
  LineChart,
  Database,
  FileText,
  CalendarArrowDown,
} from "lucide-react";
import { getStatusStyles } from "@/constants/subStyles";


export const SubmissionsContent = ({ problemId }: { problemId: number | string }) => {
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh,setRefreshing] = useState(false);

  useEffect(() => {
    if (!problemId) {
      setSubmissions([]); 
      return;
    }

    const fetchSubmissions = async () => {
      setIsLoading(true);
      setSubmissions(null); 
      try {
        const response = await apiClient.get(`/problem/submissions/subuser/${problemId}`);        
        const data: Submission[] = response.data;
        data.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        setSubmissions(data);
      } catch (e) {
        console.error("Error fetching submissions:", e);
        toast.error("Failed to load submissions.");
        setSubmissions([]); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, [refresh]); 

  const handleRefresh = () => {
      setRefreshing(!refresh);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="ml-3 text-muted-foreground">Loading submissions...</p>
        </div>
      );
    }

    if (!submissions || submissions.length === 0) {
      return (
        <p className="text-muted-foreground text-center py-10">
          You have no submissions for this problem yet.
        </p>
      );
    }

    return (
      <div className="space-y-4">
        {submissions.map((sub) => {
          const { icon, color, bgColor } = getStatusStyles(sub.status);
          const formattedDate = format(new Date(sub.submittedAt), "MMM d, yyyy 'at' h:mm a");

          return (
            <div key={sub.id} className="bg-card border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
              
              <div className={`p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${bgColor}`}>
                <div className="flex items-center gap-3">
                  <span className={color}>{icon}</span>
                  <div>
                    <span className={`text-lg font-semibold ${color}`}>{sub.status}</span>
                    <p className="text-sm text-muted-foreground">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium bg-background px-3 py-1.5 rounded-full border">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{sub.language}</span>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <span className="text-xs text-muted-foreground">Tests Passed</span>
                    <p className="font-semibold">{sub.passedTests} / {sub.totalTests}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-xs text-muted-foreground">Time</span>
                    <p className="font-semibold">{sub.timeTakenMs} ms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-600" />
                  <div>
                    <span className="text-xs text-muted-foreground">Memory</span>
                    <p className="font-semibold">{sub.memoryUsed}</p>
                  </div>
                </div>
              </div>

              <details className="border-t">
                <summary className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-muted/50 text-sm font-medium text-muted-foreground group">
                  <div className="flex items-center gap-2">
                     <Code className="w-4 h-4" />
                     <span>View Submitted Code</span>
                  </div>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="bg-gray-900 text-gray-100 p-4">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                    <code>
                      {sub.code}
                    </code>
                  </pre>
                </div>
              </details>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">My Submissions</h2>
        
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CalendarArrowDown
            className={`h-5 w-5 mr-2`}
          />
          {'Refresh'}
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default SubmissionsContent;