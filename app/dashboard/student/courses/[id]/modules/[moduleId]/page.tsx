"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, CheckCircle, ChevronLeft, ChevronRight, FileText, Play, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"

// Type definitions
type ContentType = "video" | "document" | "quiz" | "code" | "assignment"

interface ModuleContent {
  id: number
  title: string
  type: ContentType
  duration?: string
  questions?: number
  problems?: number
  completed: boolean
  content?: string
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const moduleId = params.moduleId as string

  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Mock module data
  const moduleData = {
    id: Number.parseInt(moduleId),
    title: "Linked Lists",
    description: "Understanding and implementing linked list data structures",
    progress: 40,
    content: [
      {
        id: 9,
        title: "Linked List Basics",
        type: "video" as ContentType,
        duration: "15:20",
        completed: true,
        content: "This is a video about linked list basics.",
      },
      {
        id: 10,
        title: "Singly vs Doubly Linked Lists",
        type: "document" as ContentType,
        duration: "18 min read",
        completed: true,
        content: `
# Singly vs Doubly Linked Lists

A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.

## Singly Linked List

In a singly linked list, each node contains:
- Data
- A pointer to the next node

### Example Implementation (JavaScript)

\`\`\`javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add a node to the end
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    current.next = newNode;
    this.size++;
  }
  
  // Other methods...
}
\`\`\`

## Doubly Linked List

In a doubly linked list, each node contains:
- Data
- A pointer to the next node
- A pointer to the previous node

### Example Implementation (JavaScript)

\`\`\`javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  // Add a node to the end
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }
  
  // Other methods...
}
\`\`\`

## Comparison

| Feature | Singly Linked List | Doubly Linked List |
|---------|-------------------|-------------------|
| Memory | Less memory per node | More memory per node |
| Traversal | Forward only | Both forward and backward |
| Deletion | Requires previous node reference | Direct with node reference |
| Insertion at end | O(n) without tail reference | O(1) with tail reference |
| Complexity | Simpler | More complex |

## Use Cases

- **Singly Linked Lists**: When memory is a constraint and only forward traversal is needed.
- **Doubly Linked Lists**: When bidirectional traversal is required, such as in navigation systems, browser history, etc.
        `,
      },
      {
        id: 11,
        title: "Common Operations",
        type: "video" as ContentType,
        duration: "20:10",
        completed: false,
        content: "This is a video about common operations on linked lists.",
      },
      {
        id: 12,
        title: "Coding Exercise",
        type: "code" as ContentType,
        problems: 4,
        completed: false,
        content: "This is a coding exercise about linked lists.",
      },
      {
        id: 13,
        title: "Module Quiz",
        type: "quiz" as ContentType,
        questions: 10,
        completed: false,
        content: "This is a quiz about linked lists.",
      },
    ],
    previousModule: {
      id: 2,
      title: "Arrays and Strings",
    },
    nextModule: {
      id: 4,
      title: "Stacks and Queues",
    },
  }

  // Current content
  const currentContent = moduleData.content[currentContentIndex]

  // Helper function to get content type icon
  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      case "quiz":
        return <BookOpen className="h-5 w-5" />
      case "code":
        return <Play className="h-5 w-5" />
      case "assignment":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Handle navigation between content items
  const goToNextContent = () => {
    if (currentContentIndex < moduleData.content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToPrevContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1)
      window.scrollTo(0, 0)
    }
  }

  // Mark content as completed
  const markAsCompleted = () => {
    // In a real app, this would update the database
    toast({
      title: "Content Completed",
      description: `You've completed "${currentContent.title}"`,
    })

    // Update local state
    setIsCompleted(true)

    // Auto-navigate to next content after a short delay
    setTimeout(() => {
      if (currentContentIndex < moduleData.content.length - 1) {
        goToNextContent()
      } else {
        // If this is the last content item, show module completion message
        toast({
          title: "Module Completed",
          description: "Congratulations! You've completed this module.",
        })
      }
    }, 1500)
  }

  // Calculate progress percentage
  const progressPercentage = ((currentContentIndex + 1) / moduleData.content.length) * 100

  // Render content based on type
  const renderContent = () => {
    switch (currentContent.type) {
      case "video":
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <Play className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="prose max-w-none dark:prose-invert">
              <h2>Video: {currentContent.title}</h2>
              <p>Duration: {currentContent.duration}</p>
              <p>
                This is a placeholder for the video content. In a real application, this would be an embedded video
                player.
              </p>
            </div>
          </div>
        )
      case "document":
        return (
          <div className="prose max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: currentContent.content?.replace(/\n/g, "<br>") || "" }} />
          </div>
        )
      case "quiz":
        return (
          <div className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h2>Quiz: {currentContent.title}</h2>
              <p>
                This quiz contains {currentContent.questions} questions to test your understanding of the module
                content.
              </p>
            </div>
            <Button asChild>
              <Link href={`/dashboard/student/assessments/1/mcq`}>Start Quiz</Link>
            </Button>
          </div>
        )
      case "code":
        return (
          <div className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h2>Coding Exercise: {currentContent.title}</h2>
              <p>
                This coding exercise contains {currentContent.problems} problems to practice your implementation skills.
              </p>
            </div>
            <Button asChild>
              <Link href={`/dashboard/student/coding/editor`}>Start Coding Exercise</Link>
            </Button>
          </div>
        )
      default:
        return (
          <div className="prose max-w-none dark:prose-invert">
            <p>Content not available.</p>
          </div>
        )
    }
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Navigation breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard/student/courses" className="hover:underline">
            Courses
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/dashboard/student/courses/${courseId}`} className="hover:underline">
            Data Structures & Algorithms
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{moduleData.title}</span>
        </div>

        {/* Module header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="outline" size="sm" asChild className="mb-2">
              <Link href={`/dashboard/student/courses/${courseId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{moduleData.title}</h1>
            <p className="text-muted-foreground">{moduleData.description}</p>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Module Progress</span>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {currentContentIndex + 1} of {moduleData.content.length} items
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Content navigation sidebar */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-base">Module Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {moduleData.content.map((item, index) => (
                    <button
                      key={item.id}
                      className={`flex items-start gap-3 w-full p-3 text-left transition-colors hover:bg-muted/50 ${
                        currentContentIndex === index ? "bg-muted" : ""
                      }`}
                      onClick={() => setCurrentContentIndex(index)}
                    >
                      <div className="mt-0.5">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          getContentTypeIcon(item.type)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.title}</h3>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span className="capitalize">{item.type}</span>
                          {item.duration && <span className="ml-2">{item.duration}</span>}
                          {item.questions && <span className="ml-2">{item.questions} questions</span>}
                          {item.problems && <span className="ml-2">{item.problems} problems</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-base">Module Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {moduleData.previousModule && (
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href={`/dashboard/student/courses/${courseId}/modules/${moduleData.previousModule.id}`}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {moduleData.previousModule.title}
                    </Link>
                  </Button>
                )}
                {moduleData.nextModule && (
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href={`/dashboard/student/courses/${courseId}/modules/${moduleData.nextModule.id}`}>
                      {moduleData.nextModule.title}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="md:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getContentTypeIcon(currentContent.type)}
                      <span>{currentContent.title}</span>
                    </CardTitle>
                    <CardDescription>
                      {currentContent.type === "video" && `Video • ${currentContent.duration}`}
                      {currentContent.type === "document" && `Document • ${currentContent.duration}`}
                      {currentContent.type === "quiz" && `Quiz • ${currentContent.questions} questions`}
                      {currentContent.type === "code" && `Coding Exercise • ${currentContent.problems} problems`}
                    </CardDescription>
                  </div>
                  <Badge variant={currentContent.completed || isCompleted ? "success" : "outline"}>
                    {currentContent.completed || isCompleted ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">{renderContent()}</CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={goToPrevContent} disabled={currentContentIndex === 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <div className="flex gap-2">
                  {!currentContent.completed && !isCompleted && (
                    <Button onClick={markAsCompleted}>Mark as Completed</Button>
                  )}
                  <Button onClick={goToNextContent} disabled={currentContentIndex === moduleData.content.length - 1}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Additional resources */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>Supplementary materials for this lesson</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="downloads">
                  <TabsList className="mb-4">
                    <TabsTrigger value="downloads">Downloads</TabsTrigger>
                    <TabsTrigger value="links">External Links</TabsTrigger>
                  </TabsList>
                  <TabsContent value="downloads" className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Linked List Cheat Sheet</p>
                          <p className="text-sm text-muted-foreground">PDF, 1.2 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Linked List Implementation Examples</p>
                          <p className="text-sm text-muted-foreground">ZIP, 3.5 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="links" className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Linked List Visualizer</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Interactive tool to visualize linked list operations
                      </p>
                      <Button variant="link" className="h-auto p-0">
                        Visit Website
                      </Button>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium">Linked List Problems on LeetCode</h3>
                      <p className="text-sm text-muted-foreground mb-2">Practice problems to test your understanding</p>
                      <Button variant="link" className="h-auto p-0">
                        Visit Website
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
