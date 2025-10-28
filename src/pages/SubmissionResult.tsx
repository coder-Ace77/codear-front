import { useEffect, useState, useRef } from "react"; // 1. Import useRef
import { useParams } from "react-router-dom";
import { codingService } from "@/service/codingService";
import toast from "react-hot-toast";

const FINAL_STATES = ["PASSED", "FAILED", "COMPLETED"];

const SubmissionResult = () => {
  const { submissionId } = useParams();
  const [output, setOutput] = useState("⏳ Waiting for result...");
  const [isLoading, setIsLoading] = useState(true);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!submissionId) return;

    toast.success("Starting polling for:"+submissionId);

    const fetchStatus = async () => {
      try {
        toast.success("Polling for submission result...");
        const data = await codingService.getSubmissionStatus(submissionId);
        if (FINAL_STATES.includes(data.status.toUpperCase())) {
          
          toast.success(`✅ Status: ${data.status}. Polling stopped.`);
          clearInterval(intervalRef.current); // Stop the interval
          
          setOutput(
            `Status: ${data.status}\nResult: ${data.result}\nPassed: ${data.passedTests}/${data.totalTests}\nTime: ${data.timeTakenMs}ms\nMemory: ${data.memoryUsed}`
          );
          setIsLoading(false);
        } else {          
          setOutput(`⏳ Status: ${data.status}... still processing...`);
          setIsLoading(true); 
        
        }
      } catch (error) {
        clearInterval(intervalRef.current);
        toast.error("Error fetching submission result:",error);
        setOutput("❌ Failed to fetch submission result.");
        setIsLoading(false);
      }
    };
    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, 100); 
    return () => clearInterval(intervalRef.current);
  }, [submissionId]); 

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-2xl border border-border rounded-xl bg-card p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Submission Result
        </h1>

        {isLoading && (
          <div className="text-muted-foreground text-center mb-4">
            (Fetching result...)
          </div>
        )}

        <pre className="bg-secondary p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
          {output}
        </pre>
      </div>
    </div>
  );
};

export default SubmissionResult;