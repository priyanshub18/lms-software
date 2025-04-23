"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, Save, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function SubjectiveAssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id

  const [answer, setAnswer] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [isSaving, setIsSaving] = useState(false)

  // Mock assessment data
  const assessment = {
    id: assessmentId,
    title: "System Design Case Study",
    course: "System Design",
    question:
      "Design a scalable system for a social media platform like Twitter. Discuss the key components, database design, and how you would handle the scale of millions of users and tweets. Address potential bottlenecks and how you would solve them.",
    minWords: 300,
    maxWords: 500,
    timeLimit: 30, // minutes
    rubric: [
      { criteria: "System Architecture", points: 25, description: "Clear explanation of overall architecture" },
      { criteria: "Database Design", points: 25, description: "Appropriate schema and database choice" },
      { criteria: "Scalability", points: 25, description: "Solutions for handling high traffic and data volume" },
      { criteria: "Problem Solving", points: 25, description: "Identification and solutions for bottlenecks" },
    ],
  }

  // Calculate word count when answer changes
  const handleAnswerChange = (value: string) => {
    setAnswer(value)
    setWordCount(value.trim() === "" ? 0 : value.trim().split(/\s+/).length)
  }

  // Auto-save functionality
  const saveAnswer = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Answer Saved",
        description: "Your answer has been saved as a draft.",
      })
      setIsSaving(false)
    }, 500)
  }

  // Handle submission
  const handleSubmit = () => {
    if (wordCount < assessment.minWords) {
      toast({
        title: "Warning",
        description: `Your answer is too short. Minimum ${assessment.minWords} words required.`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Assessment Submitted",
      description: "Your answer has been submitted successfully.",
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
            <CardTitle>Question</CardTitle>
            <CardDescription>Subjective Assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg">{assessment.question}</div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
              <span>
                Word limit: {assessment.minWords}-{assessment.maxWords} words
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Time limit: {assessment.timeLimit} minutes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
            <CardDescription>Write a detailed response to the question above</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[300px]"
              value={answer}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />

            <div className="flex justify-between text-sm">
              <span>
                Word count: <span className={wordCount < assessment.minWords ? "text-red-500" : ""}>{wordCount}</span>/
                {assessment.minWords}-{assessment.maxWords}
              </span>
              <Button variant="ghost" size="sm" onClick={saveAnswer} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
            </div>

            {wordCount < assessment.minWords && (
              <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm">Your answer is too short. Please write at least {assessment.minWords} words.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit Answer</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grading Rubric</CardTitle>
            <CardDescription>Your answer will be evaluated based on the following criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {assessment.rubric.map((item, index) => (
                <div key={index} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.criteria}</span>
                    <span>{item.points} points</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
