"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function MCQAssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  // Mock assessment data
  const assessment = {
    id: assessmentId,
    title: "DSA Weekly Quiz",
    course: "Data Structures & Algorithms",
    totalQuestions: 10,
    timeLimit: 15, // minutes
    questions: [
      {
        id: 1,
        text: "What is the time complexity of binary search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)", // This would be hidden in a real app
      },
      {
        id: 2,
        text: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        correctAnswer: "Stack",
      },
      {
        id: 3,
        text: "What is the worst-case time complexity of quicksort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correctAnswer: "O(n²)",
      },
      {
        id: 4,
        text: "Which of the following is NOT a linear data structure?",
        options: ["Array", "Linked List", "Queue", "Tree"],
        correctAnswer: "Tree",
      },
      {
        id: 5,
        text: "What is the space complexity of a recursive fibonacci implementation?",
        options: ["O(1)", "O(log n)", "O(n)", "O(2ⁿ)"],
        correctAnswer: "O(n)",
      },
      {
        id: 6,
        text: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
        correctAnswer: "Merge Sort",
      },
      {
        id: 7,
        text: "What data structure would you use to check if a syntax has balanced parentheses?",
        options: ["Queue", "Stack", "Heap", "Linked List"],
        correctAnswer: "Stack",
      },
      {
        id: 8,
        text: "Which of these is NOT a valid way to traverse a binary tree?",
        options: ["Pre-order", "In-order", "Post-order", "Sorted-order"],
        correctAnswer: "Sorted-order",
      },
      {
        id: 9,
        text: "What is the time complexity of accessing an element in a hash table?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(1)",
      },
      {
        id: 10,
        text: "Which algorithm is used to find the shortest path in a weighted graph?",
        options: ["Depth-First Search", "Breadth-First Search", "Dijkstra's Algorithm", "Binary Search"],
        correctAnswer: "Dijkstra's Algorithm",
      },
    ],
  }

  // Get current question
  const question = assessment.questions[currentQuestion]

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  // Navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Handle submission
  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < assessment.questions.length) {
      toast({
        title: "Warning",
        description: `You've only answered ${Object.keys(answers).length} out of ${assessment.questions.length} questions.`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Assessment Submitted",
      description: "Your answers have been submitted successfully.",
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

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / assessment.questions.length) * 100

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{assessment.title}</h1>
            <p className="text-muted-foreground">{assessment.course}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Question {currentQuestion + 1} of {assessment.questions.length}
              </CardTitle>
              <Badge>MCQ</Badge>
            </div>
            <CardDescription>
              <div className="flex items-center gap-2">
                <Progress value={progressPercentage} className="h-2 w-full" />
                <span className="text-xs whitespace-nowrap">{Math.round(progressPercentage)}%</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">{question.text}</div>

            <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={goToPrevQuestion} disabled={currentQuestion === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentQuestion < assessment.questions.length - 1 ? (
              <Button onClick={goToNextQuestion}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Quiz</Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Navigator</CardTitle>
            <CardDescription>
              {Object.keys(answers).length} of {assessment.questions.length} questions answered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {assessment.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={answers[index] ? "default" : "outline"}
                  className={`h-10 w-10 ${currentQuestion === index ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {Object.keys(answers).length < assessment.questions.length && (
              <div className="mt-4 flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm">
                  You haven't answered all questions. Unanswered questions will be marked as incorrect.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
