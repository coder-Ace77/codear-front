export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  acceptanceRate: number;
  solvedBy: number;
  description?: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  avatar: string;
  joinDate: string;
  solved: {
    easy: number;
    medium: number;
    hard: number;
  };
  streak: number;
  rank: number;
}

export const mockProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    acceptanceRate: 49.2,
    solvedBy: 5234,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    tags: ["Linked List", "Math", "Recursion"],
    acceptanceRate: 38.7,
    solvedBy: 3421,
    description: "You are given two non-empty linked lists representing two non-negative integers."
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Hash Table", "Sliding Window"],
    acceptanceRate: 33.8,
    solvedBy: 4123,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptanceRate: 35.6,
    solvedBy: 1876,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming"],
    acceptanceRate: 32.4,
    solvedBy: 3987,
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    tags: ["String"],
    acceptanceRate: 44.8,
    solvedBy: 2134,
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Easy",
    tags: ["Math"],
    acceptanceRate: 27.3,
    solvedBy: 4567,
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    tags: ["String"],
    acceptanceRate: 16.5,
    solvedBy: 2876,
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    tags: ["Math"],
    acceptanceRate: 52.7,
    solvedBy: 5678,
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    tags: ["String", "Dynamic Programming", "Recursion"],
    acceptanceRate: 27.9,
    solvedBy: 1543,
  },
  {
    id: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    acceptanceRate: 53.9,
    solvedBy: 3234,
  },
  {
    id: 12,
    title: "Integer to Roman",
    difficulty: "Medium",
    tags: ["Hash Table", "Math", "String"],
    acceptanceRate: 61.3,
    solvedBy: 2987,
  },
];

export const mockUser: User = {
  name: "Alex Johnson",
  username: "alexj_dev",
  email: "alex.johnson@example.com",
  avatar: "AJ",
  joinDate: "2023-06-15",
  solved: {
    easy: 47,
    medium: 32,
    hard: 8,
  },
  streak: 15,
  rank: 1247,
};

export const availableTags = [
  "Array", "String", "Hash Table", "Dynamic Programming", 
  "Math", "Sorting", "Greedy", "Depth-First Search", 
  "Binary Search", "Breadth-First Search", "Tree", 
  "Two Pointers", "Bit Manipulation", "Stack", "Heap", 
  "Graph", "Sliding Window", "Backtracking", "Linked List",
  "Recursion", "Divide and Conquer"
];
