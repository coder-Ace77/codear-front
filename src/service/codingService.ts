import apiClient from "@/lib/apiClient";
import { Problem } from "@/types/problem";

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