"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Play, CheckCircle, XCircle, Info } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function CodingEditorPage() {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  // Your solution here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`)

  const [language, setLanguage] = useState("javascript")
  const [output, setOutput] = useState("")
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([])
  const [isRunning, setIsRunning] = useState(false)

  // Mock problem data
  const problem = {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },
    ],
  }

  // Handle code execution
  const runCode = () => {
    setIsRunning(true)
    setOutput("")
    setTestResults([])

    // Simulate code execution delay
    setTimeout(() => {
      try {
        // For JavaScript, we can actually execute the code
        if (language === "javascript") {
          // Create a function from the code
          const userFunction = new Function(`
            ${code}
            return twoSum;
          `)()

          // Run test cases
          const results = problem.testCases.map((testCase, index) => {
            try {
              const result = userFunction(testCase.input.nums, testCase.input.target)

              // Check if arrays are equal (simple check for this example)
              const passed =
                result.length === testCase.expected.length &&
                result.every((val: number, idx: number) => val === testCase.expected[idx])

              return {
                passed,
                message: passed
                  ? `Test case ${index + 1} passed!`
                  : `Test case ${index + 1} failed. Expected ${JSON.stringify(testCase.expected)}, got ${JSON.stringify(result)}`,
              }
            } catch (error) {
              return {
                passed: false,
                message: `Test case ${index + 1} failed with error: ${(error as Error).message}`,
              }
            }
          })

          setTestResults(results)

          // Set output
          const allPassed = results.every((r) => r.passed)
          setOutput(
            allPassed ? "All test cases passed! Great job!" : "Some test cases failed. Check the details below.",
          )

          if (allPassed) {
            toast({
              title: "Success!",
              description: "All test cases passed. You've solved the problem!",
            })
          }
        } else {
          // For other languages, we'd need a backend service
          // This is a mock response
          setOutput("Code execution for languages other than JavaScript is not supported in this demo.")
        }
      } catch (error) {
        setOutput(`Error: ${(error as Error).message}`)
      } finally {
        setIsRunning(false)
      }
    }, 1000)
  }

  // Handle code submission
  const submitSolution = () => {
    runCode()

    // Check if all tests passed
    if (testResults.length > 0 && testResults.every((r) => r.passed)) {
      toast({
        title: "Solution Submitted",
        description: "Your solution has been submitted successfully!",
      })
    } else {
      toast({
        title: "Cannot Submit",
        description: "Please make sure all test cases pass before submitting.",
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardLayout userRole="student">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{problem.title}</CardTitle>
                  <CardDescription>Problem #{problem.id}</CardDescription>
                </div>
                <Badge className="capitalize">{problem.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p>{problem.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Examples</h3>
                <div className="space-y-3">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="rounded-md border p-3 space-y-1">
                      <div>
                        <span className="font-medium">Input:</span> {example.input}
                      </div>
                      <div>
                        <span className="font-medium">Output:</span> {example.output}
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="font-medium">Explanation:</span> {example.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Constraints</h3>
                <ul className="list-disc pl-5">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="flex flex-col h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Code Editor</CardTitle>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <Textarea
                className="font-mono h-full min-h-[300px]"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button variant="outline" onClick={submitSolution}>
                Submit
              </Button>
              <Button onClick={runCode} disabled={isRunning}>
                {isRunning ? (
                  "Running..."
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent>
              {output ? (
                <div className="font-mono text-sm whitespace-pre-wrap">{output}</div>
              ) : (
                <div className="text-muted-foreground text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Run your code to see the output here
                </div>
              )}

              {testResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">Test Results</h3>
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 p-2 rounded-md ${
                        result.passed
                          ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                          : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
                      }`}
                    >
                      {result.passed ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="text-sm">{result.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
