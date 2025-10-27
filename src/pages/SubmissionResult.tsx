import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {codingService} from "@/service/codingService";

const SubmissionResult = () => {
  const { submissionId } = useParams();
  const [output, setOutput] = useState("⏳ Waiting for result...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!submissionId) return;

    console.log("Starting long polling for:", submissionId);

    const pollInterval = setInterval(async () => {
      try {
        console.log("Polling for submission result...");
        const data = await codingService.getSubmissionStatus(submissionId);

        if (data.status !== "PENDING") {
          clearInterval(pollInterval);
          setOutput(
            `✅ Status: ${data.status}\nResult: ${data.result}\nPassed: ${data.passedTests}/${data.totalTests}\nTime: ${data.timeTakenMs}ms\nMemory: ${data.memoryUsed}`
          );
          setIsLoading(false);
        }
      } catch (error) {
        clearInterval(pollInterval);
        console.error("Error fetching submission result:", error);
        setOutput("❌ Failed to fetch submission result.");
        setIsLoading(false);
      }
    }, 2000); // poll every 2 seconds

    // cleanup on unmount
    return () => clearInterval(pollInterval);
  }, [submissionId]);

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-2xl border border-border rounded-xl bg-card p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Submission Result
        </h1>

        {isLoading ? (
          <div className="text-muted-foreground text-center">Fetching result...</div>
        ) : (
          <pre className="bg-secondary p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

export default SubmissionResult;
