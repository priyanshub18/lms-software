"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, FileText, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id

  // State for tracking current question and answers
  const [currentTab, setCurrentTab] = useState("instructions")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds

  // Mock assessment data based on ID
  const assessmentData = {
    id: assessmentId,
    title: "DSA Weekly Quiz",
    course: "Data Structures & Algorithms",
    type: "mixed", // Can be "mcq", "coding", "subjective", or "mixed"
    duration: 30, // in minutes
    totalQuestions: 10,
    instructions: [
      "This assessment contains multiple choice, coding, and subjective questions.",
      "You have 30 minutes to complete the assessment.",
      "You can navigate between questions using the tabs or the next/previous buttons.",
      "Your answers are automatically saved when you move to another question.",
      "You can review your answers before submitting.",
      "Once submitted, you cannot change your answers.",
    ],
    questions: [
      {
        id: 1,
        type: "mcq",
        text: "What is the time complexity of binary search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)",
      },
      {
        id: 2,
        type: "mcq",
        text: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        correctAnswer: "Stack",
      },
      {
        id: 3,
        type: "subjective",
        text: "Explain the difference between a stack and a queue with examples of their real-world applications.",
        expectedLength: "100-200 words",
      },
      {
        id: 4,
        type: "coding",
        text: "Write a function to check if a string is a palindrome.",
        language: "javascript",
        starterCode: "function isPalindrome(str) {\n  // Your code here\n}",
        testCases: [
          { input: "racecar", expected: true },
          { input: "hello", expected: false },
        ],
      },
      {
        id: 5,
        type: "mcq",
        text: "What is the worst-case time complexity of quicksort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correctAnswer: "O(n²)",
      },
    ],
  }

  // Get current question data
  const currentQuestionData = assessmentData.questions[currentQuestion]

  // Handle answer change
  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  // Handle navigation between questions
  const handleNextQuestion = () => {
    if (currentQuestion < assessmentData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Handle submission
  const handleSubmit = () => {
    // Check if all questions are answered
    const answeredQuestions = Object.keys(answers).length

    if (answeredQuestions < assessmentData.questions.length) {
      toast({
        title: "Warning",
        description: `You've only answered ${answeredQuestions} out of ${assessmentData.questions.length} questions. Are you sure you want to submit?`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Assessment Submitted",
      description: "Your assessment has been submitted successfully.",
    })

    // Redirect to dashboard
    router.push("/dashboard/student")
  }

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{assessmentData.title}</h1>
            <p className="text-muted-foreground">{assessmentData.course}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              {assessmentData.totalQuestions} Questions
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          {/* Instructions Tab */}
          <TabsContent value="instructions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Instructions</CardTitle>
                <CardDescription>Please read carefully before starting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  {assessmentData.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setCurrentTab("questions")}>Start Assessment</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Question {currentQuestion + 1} of {assessmentData.questions.length}
                  </CardTitle>
                  <Badge>{currentQuestionData.type.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg font-medium">{currentQuestionData.text}</div>

                {/* MCQ Question */}
                {currentQuestionData.type === "mcq" && (
                  <RadioGroup value={(answers[currentQuestion] as string) || ""} onValueChange={handleAnswerChange}>
                    <div className="space-y-3">
                      {currentQuestionData.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {/* Subjective Question */}
                {currentQuestionData.type === "subjective" && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Expected length: {currentQuestionData.expectedLength}
                    </div>
                    <Textarea
                      placeholder="Type your answer here..."
                      rows={6}
                      value={(answers[currentQuestion] as string) || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                    />
                  </div>
                )}

                {/* Coding Question */}
                {currentQuestionData.type === "coding" && (
                  <div className="space-y-4">
                    <div className="rounded-md border bg-muted p-4 font-mono text-sm">
                      <pre>{currentQuestionData.starterCode}</pre>
                    </div>
                    <div className="space-y-2">
                      <Label>Your Solution</Label>
                      <Textarea
                        className="font-mono"
                        rows={10}
                        value={(answers[currentQuestion] as string) || currentQuestionData.starterCode}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">Test Cases</div>
                      <div className="space-y-2">
                        {currentQuestionData.testCases.map((testCase, index) => (
                          <div key={index} className="rounded-md border p-2 text-sm">
                            <div>
                              Input: <span className="font-mono">{JSON.stringify(testCase.input)}</span>
                            </div>
                            <div>
                              Expected: <span className="font-mono">{JSON.stringify(testCase.expected)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button
                  onClick={
                    currentQuestion === assessmentData.questions.length - 1
                      ? () => setCurrentTab("review")
                      : handleNextQuestion
                  }
                >
                  {currentQuestion === assessmentData.questions.length - 1 ? "Review" : "Next"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Answers</CardTitle>
                <CardDescription>
                  You've answered {Object.keys(answers).length} out of {assessmentData.questions.length} questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                  {assessmentData.questions.map((question, index) => (
                    <Button
                      key={index}
                      variant={answers[index] ? "default" : "outline"}
                      className="h-10 w-10"
                      onClick={() => {
                        setCurrentTab("questions")
                        setCurrentQuestion(index)
                      }}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>

                {Object.keys(answers).length < assessmentData.questions.length && (
                  <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                    <AlertTriangle className="h-4 w-4" />
                    <p className="text-sm">
                      You haven't answered all questions. Unanswered questions will be marked as incorrect.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentTab("questions")
                    setCurrentQuestion(assessmentData.questions.length - 1)
                  }}
                >
                  Back to Questions
                </Button>
                <Button onClick={handleSubmit}>Submit Assessment</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
