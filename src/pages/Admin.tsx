import { useState } from "react";
import Button from "@/atoms/Button";
import Input from "@/atoms/Input";
import Label from "@/atoms/Label";
import Select from "@/atoms/Select";
import Badge from "@/atoms/Badge";
import { Check, ChevronsUpDown, Command, Plus, Tag, X } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { CommandEmpty, CommandInput, CommandItem, CommandList } from "cmdk";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import TagsSelector from "@/components/ui/Problemtags";


const DSA_TAGS = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Tree",
  "Graph",
  "Linked List",
  "Stack",
  "Queue",
  "Binary Search",
  "Recursion",
  "Two Pointers",
  "Sliding Window",
  "Greedy",
  "Backtracking",
  "Heap / Priority Queue",
  "Math",
  "Bit Manipulation",
  "Prefix Sum",
  "Sorting",
  "Depth First Search",
  "Breadth First Search",
  "Union Find",
  "Trie",
  "Matrix",
];



const Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy",
    description: "",
    constraints: "",
    exampleInput: "",
    exampleOutput: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  // This is your corrected handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Create the "sample" test case from the main form
  const sampleTestCase = {
    input: formData.exampleInput,
    output: formData.exampleOutput,
    isSample: true, 
  };

  const otherTestCases = testCases.map(tc => ({
    input: tc.input,
    output: tc.output,
    isSample: false, 
  }));

  const payload = {
    ...formData,    
    tags: tags,    
    testCases: [sampleTestCase, ...otherTestCases],
    timeLimitMs:2000,
    memoryLimitMb:256
  };
  try {
    const response = await apiClient.post("/problem/addproblem", payload);
    console.log("Problem added successfully:", response.data);
    toast.success("Problem added successfully");

    setFormData({
    title: "",
    difficulty: "Easy",
    description: "",
    constraints: "",
    exampleInput: "",
    exampleOutput: "",
    });
    setTestCases([{ input: "", output: "" }]);

  
  } catch (error) {
    console.error("Failed to add problem:", error);
    toast.error("Failed to add problem");
    // You should show an error message to the user here
  }
};

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const updateTestCase = (index: number, field: "input" | "output", value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">Create new coding problems</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title">Problem Title</Label>
                <Input
                  id="title"
                  placeholder="Two Sum"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
              </div>

              <TagsSelector tags={tags} setTags={setTags}></TagsSelector>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Problem Description</Label>
              <textarea
                id="description"
                rows={6}
                placeholder="Describe the problem in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="exampleInput">Example Input</Label>
                <textarea
                  id="exampleInput"
                  rows={4}
                  placeholder="1 100 200"
                  value={formData.exampleInput}
                  onChange={(e) => setFormData({ ...formData, exampleInput: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="exampleOutput">Example Output</Label>
                <textarea
                  id="exampleOutput"
                  rows={4}
                  placeholder="2"
                  value={formData.exampleOutput}
                  onChange={(e) => setFormData({ ...formData, exampleOutput: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
                  required
                />
              </div>
            </div>

            {/* Constraints */}
            <div>
              <Label htmlFor="constraints">Constraints</Label>
              <textarea
                id="constraints"
                rows={4}
                placeholder="2 ≤ nums.length ≤ 10⁴&#10;-10⁹ ≤ nums[i] ≤ 10⁹"
                value={formData.constraints}
                onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
                required
              />
            </div>

            {/* Test Cases */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Test Cases</Label>
                <Button type="button" variant="secondary" size="sm" onClick={addTestCase}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Test Case
                </Button>
              </div>

              <div className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-secondary border border-border">
                    <div>
                      <Label htmlFor={`test-input-${index}`}>Input {index + 1}</Label>
                      <Textarea
                        id={`test-input-${index}`}
                        placeholder="5 abc"
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, "input", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
                        required
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <Label htmlFor={`test-output-${index}`}>Expected Output {index + 1}</Label>
                        {testCases.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTestCase(index)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <Textarea
                        id={`test-output-${index}`}
                        placeholder="0"
                        value={testCase.output}
                        onChange={(e) => updateTestCase(index, "output", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" size="lg" className="flex-1">
                Create Problem
              </Button>
              <Button type="button" variant="outline" size="lg">
                Preview
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
