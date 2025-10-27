import apiClient from "@/lib/apiClient";
import { Problem } from "@/types/problem";

const mockUserId = 123;

export const fetchProblem = async (
    setLoading,
    setError,
    setProblem,
    id,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<Problem>(`/problem/${id}`);
        setProblem(response.data);
      } catch (err) {
        console.error("Failed to fetch problem:", err);
        setError("Failed to load problem. Please try again.");
      } finally {
        setLoading(false);
      }
    };


export const codingService = {
  async submitCode(problemId, code, language) {
    const body = { problemId, code, language, userId: mockUserId };
    console.log(code)
    const response = await apiClient.post('/submit', body);
    return response.data; // { submissionId: "..." }
  },

  async getSubmissionStatus(submissionId) {
    const response = await apiClient.get(`/submissions/${submissionId}`);
    return response.data; // contains status, result, etc.
  },

  async runCode(problemId, code, language) {
    const body = { problemId, code, language, userId: mockUserId };
    const response = await apiClient.post("/run", body);
    return response.data; // immediate output
  },
};
