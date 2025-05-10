export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: TestCase[];
  constraints: string[];
  hints: string[];
  starterCode: {
    [key: string]: string;
  };
  testCases: {
    input: number[];
    target: number;
    expected: number[];
  }[];
}

export interface TestResults {
  passed: number;
  failed: number;
  testCases: {
    id: number;
    name: string;
    status: "passed" | "failed";
    expected?: string;
    actual?: string;
  }[];
}

export interface DiscussionPost {
  id: number;
  title: string;
  author: string;
  replies: number;
  timeAgo: string;
} 