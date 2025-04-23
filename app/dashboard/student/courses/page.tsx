import Link from "next/link"
import { CalendarClock, Clock, GraduationCap, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard-layout"

export default function CoursesPage() {
  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      instructor: "Dr. Jane Smith",
      description:
        "A comprehensive course covering fundamental data structures and algorithms essential for technical interviews and competitive programming.",
      progress: 65,
      totalModules: 8,
      completedModules: 5,
      nextLesson: "Graph Algorithms",
      duration: "12 weeks",
      enrolledStudents: 45,
      lastAccessed: "2025-04-18",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Programming", "Algorithms", "Data Structures"],
    },
    {
      id: 2,
      title: "System Design",
      instructor: "Prof. John Doe",
      description:
        "Learn how to design scalable systems, covering topics from database design to distributed systems architecture.",
      progress: 30,
      totalModules: 6,
      completedModules: 2,
      nextLesson: "Distributed Systems",
      duration: "10 weeks",
      enrolledStudents: 32,
      lastAccessed: "2025-04-20",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["System Design", "Architecture", "Scalability"],
    },
    {
      id: 3,
      title: "Frontend Development",
      instructor: "Sarah Johnson",
      description:
        "Master modern frontend development with React, Next.js, and related technologies for building responsive web applications.",
      progress: 80,
      totalModules: 10,
      completedModules: 8,
      nextLesson: "React Hooks",
      duration: "8 weeks",
      enrolledStudents: 28,
      lastAccessed: "2025-04-21",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Frontend", "React", "Web Development"],
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Chen",
      description:
        "An introduction to machine learning concepts, algorithms, and practical applications using Python and popular ML libraries.",
      progress: 15,
      totalModules: 12,
      completedModules: 2,
      nextLesson: "Supervised Learning",
      duration: "14 weeks",
      enrolledStudents: 38,
      lastAccessed: "2025-04-15",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Machine Learning", "AI", "Python"],
    },
  ]

  // Recommended courses
  const recommendedCourses = [
    {
      id: 5,
      title: "Advanced Database Systems",
      instructor: "Prof. Lisa Wong",
      description:
        "Deep dive into advanced database concepts, optimization techniques, and modern database technologies.",
      duration: "10 weeks",
      enrolledStudents: 25,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Databases", "SQL", "NoSQL"],
    },
    {
      id: 6,
      title: "Cloud Computing & DevOps",
      instructor: "James Wilson",
      description:
        "Learn cloud architecture, deployment strategies, and DevOps practices for modern application development.",
      duration: "8 weeks",
      enrolledStudents: 30,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Cloud", "DevOps", "AWS"],
    },
  ]

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">Manage and track your enrolled courses</p>
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Enrolled Courses</h2>
            <Button variant="outline" size="sm">
              <GraduationCap className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </div>
                    <Badge variant="outline">{course.tags[0]}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{course.enrolledStudents} students</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/student/courses/${course.id}`}>
                      {course.progress > 0 ? "Continue Learning" : "Start Course"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Accessed */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recently Accessed</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {enrolledCourses.slice(0, 2).map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 aspect-video sm:aspect-square overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-auto">
                      <CalendarClock className="mr-1 h-3.5 w-3.5" />
                      <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                    </div>
                    <Button variant="ghost" asChild className="mt-2 w-full sm:w-auto sm:self-end">
                      <Link href={`/dashboard/student/courses/${course.id}`}>Continue</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended For You</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 aspect-video sm:aspect-square overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3.5 w-3.5" />
                        <span>{course.enrolledStudents} students</span>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
