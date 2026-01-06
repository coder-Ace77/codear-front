import apiClient from "@/lib/apiClient";

export const aiService = {
  async chatWithAssistant(problemStatement: string, code: string, userMessage: string) {
    const body = {
      problemStatement,
      code,
      userMessage,
    };
    const response = await apiClient.post('/user/chat', body);
    return response.data;
  },
};