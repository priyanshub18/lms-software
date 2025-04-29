"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, BookOpen, CheckCircle, ChevronLeft, ChevronRight, FileText, Play, Video, Download, ExternalLink } from "lucide-react"
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
    const [isLoading, setIsLoading] = useState(true)

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

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
                return <Video className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            case "document":
                return <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            case "quiz":
                return <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            case "code":
                return <Play className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            case "assignment":
                return <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            default:
                return <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
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

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    }

    const slideIn = {
        hidden: { x: 20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
    }

    // Render content based on type
    const renderContent = () => {
        switch (currentContent.type) {
            case "video":
                return (
                    <motion.div
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="bg-blue-500 dark:bg-blue-600 rounded-full p-4 cursor-pointer shadow-lg"
                            >
                                <Play className="h-10 w-10 text-white" />
                            </motion.div>
                        </div>
                        <div className="prose max-w-none dark:prose-invert">
                            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">Video: {currentContent.title}</h2>
                            <p className="text-slate-600 dark:text-slate-300">Duration: {currentContent.duration}</p>
                            <p className="text-slate-700 dark:text-slate-200 mt-4">
                                This is a placeholder for the video content. In a real application, this would be an embedded video
                                player with comprehensive controls and features.
                            </p>
                        </div>
                    </motion.div>
                )
            case "document":
                return (
                    <motion.div
                        className="prose max-w-none dark:prose-invert prose-blue prose-headings:text-blue-700 dark:prose-headings:text-blue-400 prose-a:text-blue-600 dark:prose-a:text-blue-400"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        dangerouslySetInnerHTML={{ __html: currentContent.content?.replace(/\n/g, "<br>") || "" }}
                    />
                )
            case "quiz":
                return (
                    <motion.div
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="prose max-w-none dark:prose-invert">
                            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">Quiz: {currentContent.title}</h2>
                            <p className="text-slate-700 dark:text-slate-200">
                                This quiz contains {currentContent.questions} questions to test your understanding of the module
                                content.
                            </p>
                        </div>
                        <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
                        >
                            <Link href={`/dashboard/trainer/assessments/1/mcq`}>
                                Start Quiz
                            </Link>
                        </Button>
                    </motion.div>
                )
            case "code":
                return (
                    <motion.div
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="prose max-w-none dark:prose-invert">
                            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">Coding Exercise: {currentContent.title}</h2>
                            <p className="text-slate-700 dark:text-slate-200">
                                This coding exercise contains {currentContent.problems} problems to practice your implementation skills.
                            </p>
                        </div>
                        <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
                        >
                            <Link href={`/dashboard/trainer/coding/editor`}>Start Coding Exercise</Link>
                        </Button>
                    </motion.div>
                )
            default:
                return (
                    <div className="prose max-w-none dark:prose-invert">
                        <p>Content not available.</p>
                    </div>
                )
        }
    }

    if (isLoading) {
        return (
            <DashboardLayout userRole="trainer">
                <div className="flex items-center justify-center h-screen">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">Loading module content...</p>
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout userRole="trainer">
            <motion.div
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Navigation breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2 rounded-md">
                    <Link href="/dashboard/trainer/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Courses
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/dashboard/trainer/courses/${courseId}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Data Structures & Algorithms
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-medium text-blue-600 dark:text-blue-400">{moduleData.title}</span>
                </div>

                {/* Module header */}
                <motion.div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950 p-6 rounded-xl shadow-sm"
                    variants={fadeIn}
                >
                    <div>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="mb-2 border-blue-300 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                        >
                            <Link href={`/dashboard/trainer/courses/${courseId}`}>
                                <ArrowLeft className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-blue-600 dark:text-blue-400">Back to Course</span>
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{moduleData.title}</h1>
                        <p className="text-slate-600 dark:text-slate-300">{moduleData.description}</p>
                    </div>
                    <motion.div
                        className="flex flex-col gap-2 min-w-[200px] bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Module Progress</span>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{Math.round(progressPercentage)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 bg-slate-200 dark:bg-slate-700">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                        </Progress>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {currentContentIndex + 1} of {moduleData.content.length} items
                        </p>
                    </motion.div>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-4">
                    {/* Content navigation sidebar */}
                    <motion.div
                        className="md:col-span-1 space-y-4"
                        variants={slideIn}
                    >
                        <Card className="border-slate-200 dark:border-slate-700 shadow-md overflow-hidden bg-white dark:bg-slate-900">
                            <CardHeader className="py-3 bg-slate-50 dark:bg-slate-800">
                                <CardTitle className="text-base text-blue-700 dark:text-blue-400">Module Content</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {moduleData.content.map((item, index) => (
                                        <motion.button
                                            key={item.id}
                                            className={`flex items-start gap-3 w-full p-3 text-left transition-all duration-200 hover:bg-blue-50 dark:hover:bg-slate-800 ${currentContentIndex === index
                                                    ? "bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-500 dark:border-blue-600"
                                                    : ""
                                                }`}
                                            onClick={() => setCurrentContentIndex(index)}
                                            whileHover={{ x: 2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="mt-0.5">
                                                {item.completed ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                                                ) : (
                                                    getContentTypeIcon(item.type)
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-medium text-sm ${currentContentIndex === index
                                                        ? "text-blue-700 dark:text-blue-400"
                                                        : "text-slate-700 dark:text-slate-200"
                                                    }`}>
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="capitalize">{item.type}</span>
                                                    {item.duration && <span className="ml-2">{item.duration}</span>}
                                                    {item.questions && <span className="ml-2">{item.questions} questions</span>}
                                                    {item.problems && <span className="ml-2">{item.problems} problems</span>}
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-900">
                            <CardHeader className="py-3 bg-slate-50 dark:bg-slate-800">
                                <CardTitle className="text-base text-blue-700 dark:text-blue-400">Module Navigation</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 p-4">
                                {moduleData.previousModule && (
                                    <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300"
                                            asChild
                                        >
                                            <Link href={`/dashboard/trainer/courses/${courseId}/modules/${moduleData.previousModule.id}`}>
                                                <ChevronLeft className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                <span className="text-slate-700 dark:text-slate-200">{moduleData.previousModule.title}</span>
                                            </Link>
                                        </Button>
                                    </motion.div>
                                )}
                                {moduleData.nextModule && (
                                    <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-between border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300"
                                            asChild
                                        >
                                            <Link href={`/dashboard/trainer/courses/${courseId}/modules/${moduleData.nextModule.id}`}>
                                                <span className="text-slate-700 dark:text-slate-200">{moduleData.nextModule.title}</span>
                                                <ChevronRight className="ml-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </Link>
                                        </Button>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Main content area */}
                    <motion.div
                        className="md:col-span-3 space-y-4"
                        variants={slideIn}
                    >
                        <Card className="border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-900/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                                            {getContentTypeIcon(currentContent.type)}
                                            <span>{currentContent.title}</span>
                                        </CardTitle>
                                        <CardDescription className="text-slate-600 dark:text-slate-300">
                                            {currentContent.type === "video" && `Video • ${currentContent.duration}`}
                                            {currentContent.type === "document" && `Document • ${currentContent.duration}`}
                                            {currentContent.type === "quiz" && `Quiz • ${currentContent.questions} questions`}
                                            {currentContent.type === "code" && `Coding Exercise • ${currentContent.problems} problems`}
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant={currentContent.completed || isCompleted ? "success" : "outline"}
                                        className={currentContent.completed || isCompleted
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700"
                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700"}
                                    >
                                        {currentContent.completed || isCompleted ? "Completed" : "In Progress"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <Separator className="bg-slate-200 dark:bg-slate-700" />
                            <CardContent className="pt-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentContentIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {renderContent()}
                                    </motion.div>
                                </AnimatePresence>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-4">
                                <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="outline"
                                        onClick={goToPrevContent}
                                        disabled={currentContentIndex === 0}
                                        className="border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 transition-all duration-300"
                                    >
                                        <ChevronLeft className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span className="text-slate-700 dark:text-slate-200">Previous</span>
                                    </Button>
                                </motion.div>
                                <div className="flex gap-2">
                                    {!currentContent.completed && !isCompleted && (
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                onClick={markAsCompleted}
                                                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
                                            >
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Mark as Completed
                                            </Button>
                                        </motion.div>
                                    )}
                                    <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            onClick={goToNextContent}
                                            disabled={currentContentIndex === moduleData.content.length - 1}
                                            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 disabled:bg-slate-400 dark:disabled:bg-slate-700 transition-all duration-300"
                                        >
                                            <span>Next</span>
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Additional resources */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Card className="border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
                                <CardHeader className="bg-slate-50 dark:bg-slate-800">
                                    <CardTitle className="text-blue-700 dark:text-blue-400">Additional Resources</CardTitle>
                                    <CardDescription className="text-slate-600 dark:text-slate-300">Supplementary materials for this lesson</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <Tabs defaultValue="downloads" className="w-full">
                                        <TabsList className="mb-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                            <TabsTrigger
                                                value="downloads"
                                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 rounded-md transition-all duration-300"
                                            >
                                                Downloads
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="links"
                                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 rounded-md transition-all duration-300"
                                            >
                                                External Links
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="downloads" className="space-y-4">
                                            <motion.div
                                                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 hover:shadow-md transition-all duration-300"
                                                whileHover={{
                                                    y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0,0, 0, 0.1)"
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-md">
                                                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-slate-700 dark:text-slate-200">Linked Lists Cheat Sheet</h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">PDF • 1.2 MB</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </motion.div>

                                            <motion.div
                                                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 hover:shadow-md transition-all duration-300"
                                                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-md">
                                                        <Play className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-slate-700 dark:text-slate-200">Linked List Visualization Tool</h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">HTML • 3.5 MB</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </motion.div>
                                        </TabsContent>
                                        <TabsContent value="links" className="space-y-4">
                                            <motion.div
                                                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 hover:shadow-md transition-all duration-300"
                                                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-md">
                                                        <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-slate-700 dark:text-slate-200">Interactive Linked List Visualization</h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">visualgo.net</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30" asChild>
                                                    <a href="https://visualgo.net/en/list" target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                        Visit
                                                    </a>
                                                </Button>
                                            </motion.div>

                                            <motion.div
                                                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 hover:shadow-md transition-all duration-300"
                                                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-md">
                                                        <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-slate-700 dark:text-slate-200">Linked List Practice Problems</h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">leetcode.com</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30" asChild>
                                                    <a href="https://leetcode.com/tag/linked-list/" target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                        Visit
                                                    </a>
                                                </Button>
                                            </motion.div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Discussion section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Card className="border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
                                <CardHeader className="bg-slate-50 dark:bg-slate-800">
                                    <CardTitle className="text-blue-700 dark:text-blue-400">Discussion</CardTitle>
                                    <CardDescription className="text-slate-600 dark:text-slate-300">Questions and comments about this lesson</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                                                <span className="font-medium text-blue-700 dark:text-blue-400">JS</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-medium text-slate-800 dark:text-white">John Smith</h4>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">2 days ago</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                                        What's the time complexity of removing a node from the end of a doubly linked list if we have a tail pointer?
                                                    </p>
                                                </div>
                                                <div className="ml-6 mt-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-medium text-blue-700 dark:text-blue-400">Instructor</h4>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">1 day ago</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                                        Great question! With a tail pointer, removing from the end of a doubly linked list is O(1) time complexity, since we can directly access the last node and update its previous node's next pointer.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                                                <span className="font-medium text-blue-700 dark:text-blue-400">AW</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-medium text-slate-800 dark:text-white">Alice Wong</h4>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">1 day ago</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                                        Is there a practical use case where you'd prefer a singly linked list over a doubly linked list?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                                <textarea
                                                    className="w-full bg-white dark:bg-slate-900 rounded-md border border-slate-300 dark:border-slate-700 p-2 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                                                    placeholder="Add your comment or question..."
                                                    rows={3}
                                                ></textarea>
                                                <div className="flex justify-end mt-2">
                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300">
                                                        Post Comment
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </DashboardLayout>
    )
}