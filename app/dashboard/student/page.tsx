import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, FileText, Play, Video } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StudentDashboardPage() {
  // Mock data for student dashboard
  const enrolledCourses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      progress: 65,
      instructor: "Dr. Jane Smith",
      nextLesson: "Graph Algorithms",
    },
    {
      id: 2,
      title: "System Design",
      progress: 30,
      instructor: "Prof. John Doe",
      nextLesson: "Distributed Systems",
    },
    {
      id: 3,
      title: "Frontend Development",
      progress: 80,
      instructor: "Sarah Johnson",
      nextLesson: "React Hooks",
    },
  ]

  const upcomingAssessments = [
    {
      id: 1,
      title: "DSA Weekly Quiz",
      course: "Data Structures & Algorithms",
      dueDate: "2025-04-25",
      type: "MCQ",
    },
    {
      id: 2,
      title: "System Design Case Study",
      course: "System Design",
      dueDate: "2025-04-28",
      type: "Subjective",
    },
    {
      id: 3,
      title: "React Component Challenge",
      course: "Frontend Development",
      dueDate: "2025-04-30",
      type: "Coding",
    },
  ]

  // Course timeline data
  const courseTimeline = [
    {
      id: 1,
      title: "Introduction to Data Structures",
      course: "Data Structures & Algorithms",
      date: "2025-03-15",
      status: "completed",
      type: "module",
    },
    {
      id: 2,
      title: "Arrays and Strings",
      course: "Data Structures & Algorithms",
      date: "2025-03-22",
      status: "completed",
      type: "module",
    },
    {
      id: 3,
      title: "DSA Mid-term Assessment",
      course: "Data Structures & Algorithms",
      date: "2025-03-29",
      status: "completed",
      type: "assessment",
      score: 85,
    },
    {
      id: 4,
      title: "Linked Lists",
      course: "Data Structures & Algorithms",
      date: "2025-04-05",
      status: "in-progress",
      type: "module",
      currentLesson: "Common Operations",
    },
    {
      id: 5,
      title: "DSA Weekly Quiz",
      course: "Data Structures & Algorithms",
      date: "2025-04-25",
      status: "upcoming",
      type: "assessment",
    },
    {
      id: 6,
      title: "Stacks and Queues",
      course: "Data Structures & Algorithms",
      date: "2025-05-03",
      status: "upcoming",
      type: "module",
    },
  ]

  // Helper function to get icon based on timeline item type
  const getTimelineIcon = (type: string, status: string) => {
    if (status === "completed") {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    }

    switch (type) {
      case "module":
        return <FileText className="h-5 w-5 text-primary" />
      case "assessment":
        return <Play className="h-5 w-5 text-orange-500" />
      case "video":
        return <Video className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-primary" />
    }
  }

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>
      default:
        return null
    }
  }

  return (
    <DashboardLayout userRole="student">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Welcome back, John</CardTitle>
            <CardDescription>Track your progress and upcoming assessments</CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Your enrolled courses and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                    </div>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Next lesson: {course.nextLesson}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Assessments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssessments.map((assessment) => (
                <div key={assessment.id} className="flex flex-col space-y-1">
                  <h3 className="font-medium">{assessment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assessment.course}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{assessment.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Timeline */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Course Timeline</CardTitle>
            <CardDescription>Your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-0">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              {courseTimeline.map((item, index) => (
                <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-0 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                      {getTimelineIcon(item.type, item.status)}
                    </div>
                  </div>

                  {/* Timeline content */}
                  <div className="flex-1 ml-12 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.course}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>

                    {item.status === "completed" && item.type === "assessment" && (
                      <div className="text-sm">
                        Score: <span className="font-medium text-green-500">{item.score}%</span>
                      </div>
                    )}

                    {item.status === "in-progress" && item.currentLesson && (
                      <div className="text-sm">
                        Current lesson: <span className="font-medium">{item.currentLesson}</span>
                      </div>
                    )}

                    {item.status === "upcoming" && (
                      <Button size="sm" variant="outline" asChild>
                        <Link
                          href={
                            item.type === "assessment"
                              ? `/dashboard/student/assessments/${item.id}`
                              : `/dashboard/student/courses/1`
                          }
                        >
                          {item.type === "assessment" ? "Prepare" : "Preview"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
