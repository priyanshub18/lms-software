import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"

export default function TrainerDashboardPage() {
  // Mock data for trainer dashboard
  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      students: 45,
      avgProgress: 68,
      lastUpdated: "2025-04-18",
    },
    {
      id: 2,
      title: "System Design",
      students: 32,
      avgProgress: 42,
      lastUpdated: "2025-04-20",
    },
    {
      id: 3,
      title: "Frontend Development",
      students: 28,
      avgProgress: 75,
      lastUpdated: "2025-04-21",
    },
  ]

  const recentAssessments = [
    {
      id: 1,
      title: "DSA Mid-term",
      course: "Data Structures & Algorithms",
      submissions: 42,
      avgScore: 78,
    },
    {
      id: 2,
      title: "Database Design Quiz",
      course: "System Design",
      submissions: 30,
      avgScore: 65,
    },
    {
      id: 3,
      title: "JavaScript Challenge",
      course: "Frontend Development",
      submissions: 25,
      avgScore: 82,
    },
  ]

  const lowPerformingStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      course: "Data Structures & Algorithms",
      progress: 35,
      lastActive: "2025-04-15",
    },
    {
      id: 2,
      name: "Maria Garcia",
      course: "System Design",
      progress: 28,
      lastActive: "2025-04-19",
    },
    {
      id: 3,
      name: "Raj Patel",
      course: "Frontend Development",
      progress: 40,
      lastActive: "2025-04-20",
    },
  ]

  return (
    <DashboardLayout userRole="trainer">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Welcome back, Jane</CardTitle>
            <CardDescription>Monitor your courses and student performance</CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Courses you are teaching</CardDescription>
            </div>
            <Button asChild>
              <Link href="/dashboard/trainer/courses/create">Create Course</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.students} students enrolled</p>
                    </div>
                    <span className="text-sm font-medium">Avg. Progress: {course.avgProgress}%</span>
                  </div>
                  <Progress value={course.avgProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <Tabs defaultValue="assessments">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance</CardTitle>
                <TabsList>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Recent assessment results and student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="assessments" className="space-y-4">
                {recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex flex-col space-y-1">
                    <h3 className="font-medium">{assessment.title}</h3>
                    <p className="text-sm text-muted-foreground">{assessment.course}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{assessment.submissions} submissions</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                        Avg: {assessment.avgScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="students" className="space-y-4">
                {lowPerformingStudents.map((student) => (
                  <div key={student.id} className="flex flex-col space-y-1">
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.course}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress: {student.progress}%</span>
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">At Risk</span>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  )
}
