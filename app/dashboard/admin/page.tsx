import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminDashboardPage() {
  // Mock data for admin dashboard
  const collegeStats = {
    totalStudents: 1250,
    totalTrainers: 45,
    totalCourses: 28,
    activeAssessments: 15,
  }

  const recentCourses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      trainer: "Dr. Jane Smith",
      students: 45,
      startDate: "2025-03-15",
    },
    {
      id: 2,
      title: "System Design",
      trainer: "Prof. John Doe",
      students: 32,
      startDate: "2025-03-20",
    },
    {
      id: 3,
      title: "Frontend Development",
      trainer: "Sarah Johnson",
      students: 28,
      startDate: "2025-03-25",
    },
  ]

  const placementStats = [
    {
      company: "Google",
      offers: 12,
      avgPackage: "$120,000",
    },
    {
      company: "Microsoft",
      offers: 8,
      avgPackage: "$115,000",
    },
    {
      company: "Amazon",
      offers: 15,
      avgPackage: "$110,000",
    },
    {
      company: "Meta",
      offers: 6,
      avgPackage: "$125,000",
    },
  ]

  return (
    <DashboardLayout userRole="admin">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collegeStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+12% from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collegeStats.totalTrainers}</div>
            <p className="text-xs text-muted-foreground">+3 new trainers this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collegeStats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">+5 new courses this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collegeStats.activeAssessments}</div>
            <p className="text-xs text-muted-foreground">3 due this week</p>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>Recently added courses</CardDescription>
            </div>
            <Button asChild>
              <Link href="/dashboard/admin/courses/create">Add Course</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex flex-col space-y-1">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">Trainer: {course.trainer}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>{course.students} students enrolled</span>
                    <span>Started: {new Date(course.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>Placement Statistics</CardTitle>
            <CardDescription>Recent placement offers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="offers">
              <TabsList className="mb-4">
                <TabsTrigger value="offers">Offers</TabsTrigger>
                <TabsTrigger value="companies">Companies</TabsTrigger>
              </TabsList>
              <TabsContent value="offers" className="space-y-4">
                <div className="grid grid-cols-3 gap-4 font-medium">
                  <div>Company</div>
                  <div>Offers</div>
                  <div>Avg. Package</div>
                </div>
                {placementStats.map((stat, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                    <div>{stat.company}</div>
                    <div>{stat.offers}</div>
                    <div>{stat.avgPackage}</div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="companies" className="space-y-4">
                <div className="text-sm">
                  <p className="mb-2">Top recruiting companies this year:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Amazon - 15 offers</li>
                    <li>Google - 12 offers</li>
                    <li>Microsoft - 8 offers</li>
                    <li>Meta - 6 offers</li>
                    <li>Adobe - 5 offers</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
