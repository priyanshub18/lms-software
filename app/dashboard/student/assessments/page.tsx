import Link from "next/link"
import { Clock, FileCheck, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"

export default function AssessmentsPage() {
  // Mock assessment data
  const upcomingAssessments = [
    {
      id: 1,
      title: "DSA Weekly Quiz",
      course: "Data Structures & Algorithms",
      dueDate: "2025-04-25",
      type: "MCQ",
      questions: 15,
      duration: 30,
    },
    {
      id: 2,
      title: "System Design Case Study",
      course: "System Design",
      dueDate: "2025-04-28",
      type: "Subjective",
      questions: 5,
      duration: 60,
    },
    {
      id: 3,
      title: "React Component Challenge",
      course: "Frontend Development",
      dueDate: "2025-04-30",
      type: "Coding",
      questions: 3,
      duration: 90,
    },
  ]

  const completedAssessments = [
    {
      id: 4,
      title: "Introduction to Algorithms Quiz",
      course: "Data Structures & Algorithms",
      completedDate: "2025-04-15",
      type: "MCQ",
      score: 85,
      totalQuestions: 10,
    },
    {
      id: 5,
      title: "Array Manipulation Challenge",
      course: "Data Structures & Algorithms",
      completedDate: "2025-04-10",
      type: "Coding",
      score: 90,
      totalQuestions: 3,
    },
    {
      id: 6,
      title: "Database Design Exercise",
      course: "System Design",
      completedDate: "2025-04-05",
      type: "Subjective",
      score: 75,
      totalQuestions: 5,
    },
  ]

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">View and take your assessments</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAssessments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileQuestion className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">You don't have any upcoming assessments.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingAssessments.map((assessment) => (
                  <Card key={assessment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{assessment.title}</CardTitle>
                          <CardDescription>{assessment.course}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            assessment.type === "MCQ"
                              ? "default"
                              : assessment.type === "Subjective"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assessment.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <FileQuestion className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {assessment.questions} questions ({assessment.duration} min)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link href={`/dashboard/student/assessments/${assessment.id}`}>Start Assessment</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedAssessments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileCheck className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">You haven't completed any assessments yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedAssessments.map((assessment) => (
                  <Card key={assessment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{assessment.title}</CardTitle>
                          <CardDescription>{assessment.course}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            assessment.type === "MCQ"
                              ? "default"
                              : assessment.type === "Subjective"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assessment.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Completed: {new Date(assessment.completedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <FileCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            Score: {assessment.score}% ({(assessment.score * assessment.totalQuestions) / 100}/
                            {assessment.totalQuestions})
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/dashboard/student/assessments/${assessment.id}/review`}>View Results</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
