// This should match your TestCase entity
export interface TestCase {
  id: number;
  input: string;
  output: string;
  isSample: boolean;
}

// This matches your Problem entity from Java
export interface Problem {
  id: number;
  title: string;
  description: string;
  inputDescription: string | null;
  outputDescription: string | null;
  constraints: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  timeLimitMs: number;
  memoryLimitMb: number;
  testCases: TestCase[]; // We need this to find the sample case
}