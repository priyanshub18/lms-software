"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"

export default function CreateCoursePage() {
  const router = useRouter()

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
  })

  const [modules, setModules] = useState([
    { title: "", description: "", contents: [{ title: "", type: "video", duration: "" }] },
  ])

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleModuleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newModules = [...modules]
    newModules[index] = { ...newModules[index], [name]: value }
    setModules(newModules)
  }

  const handleContentChange = (moduleIndex: number, contentIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newModules = [...modules]
    newModules[moduleIndex].contents[contentIndex] = {
      ...newModules[moduleIndex].contents[contentIndex],
      [name]: value,
    }
    setModules(newModules)
  }

  const handleContentTypeChange = (moduleIndex: number, contentIndex: number, value: string) => {
    const newModules = [...modules]
    newModules[moduleIndex].contents[contentIndex] = {
      ...newModules[moduleIndex].contents[contentIndex],
      type: value,
    }
    setModules(newModules)
  }

  const addModule = () => {
    setModules([...modules, { title: "", description: "", contents: [{ title: "", type: "video", duration: "" }] }])
  }

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      const newModules = [...modules]
      newModules.splice(index, 1)
      setModules(newModules)
    }
  }

  const addContent = (moduleIndex: number) => {
    const newModules = [...modules]
    newModules[moduleIndex].contents.push({ title: "", type: "video", duration: "" })
    setModules(newModules)
  }

  const removeContent = (moduleIndex: number, contentIndex: number) => {
    if (modules[moduleIndex].contents.length > 1) {
      const newModules = [...modules]
      newModules[moduleIndex].contents.splice(contentIndex, 1)
      setModules(newModules)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!courseData.title || !courseData.description || !courseData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send data to the server
    toast({
      title: "Course Created",
      description: "Your course has been created successfully",
    })

    // Redirect to courses page
    router.push("/dashboard/trainer/courses")
  }

  return (
    <DashboardLayout userRole="trainer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground">Create a new course with modules and content</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>Basic information about your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Data Structures & Algorithms"
                      value={courseData.title}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="data-structures">Data Structures</SelectItem>
                        <SelectItem value="algorithms">Algorithms</SelectItem>
                        <SelectItem value="system-design">System Design</SelectItem>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of your course"
                    rows={4}
                    value={courseData.description}
                    onChange={handleCourseChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Estimated Duration (weeks)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      placeholder="e.g., 8"
                      value={courseData.duration}
                      onChange={handleCourseChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Course Modules</h2>
                <Button type="button" onClick={addModule} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Module
                </Button>
              </div>

              {modules.map((module, moduleIndex) => (
                <Card key={moduleIndex}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle>Module {moduleIndex + 1}</CardTitle>
                      <CardDescription>Add content to this module</CardDescription>
                    </div>
                    {modules.length > 1 && (
                      <Button type="button" onClick={() => removeModule(moduleIndex)} variant="ghost" size="sm">
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`module-${moduleIndex}-title`}>Module Title</Label>
                      <Input
                        id={`module-${moduleIndex}-title`}
                        name="title"
                        placeholder="e.g., Introduction to Algorithms"
                        value={module.title}
                        onChange={(e) => handleModuleChange(moduleIndex, e)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`module-${moduleIndex}-description`}>Module Description</Label>
                      <Textarea
                        id={`module-${moduleIndex}-description`}
                        name="description"
                        placeholder="Describe what this module covers"
                        rows={2}
                        value={module.description}
                        onChange={(e) => handleModuleChange(moduleIndex, e)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Module Content</Label>
                        <Button type="button" onClick={() => addContent(moduleIndex)} variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Content
                        </Button>
                      </div>

                      {module.contents.map((content, contentIndex) => (
                        <div key={contentIndex} className="grid grid-cols-1 gap-4 rounded-md border p-4 sm:grid-cols-4">
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor={`content-${moduleIndex}-${contentIndex}-title`}>Title</Label>
                            <Input
                              id={`content-${moduleIndex}-${contentIndex}-title`}
                              name="title"
                              placeholder="e.g., Introduction Video"
                              value={content.title}
                              onChange={(e) => handleContentChange(moduleIndex, contentIndex, e)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`content-${moduleIndex}-${contentIndex}-type`}>Type</Label>
                            <Select
                              value={content.type}
                              onValueChange={(value) => handleContentTypeChange(moduleIndex, contentIndex, value)}
                            >
                              <SelectTrigger id={`content-${moduleIndex}-${contentIndex}-type`}>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="code">Coding Exercise</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-end space-y-2">
                            <div className="flex w-full items-end gap-2">
                              <div className="flex-1 space-y-2">
                                <Label htmlFor={`content-${moduleIndex}-${contentIndex}-duration`}>
                                  {content.type === "video" ? "Duration (min)" : "Est. Time (min)"}
                                </Label>
                                <Input
                                  id={`content-${moduleIndex}-${contentIndex}-duration`}
                                  name="duration"
                                  placeholder="e.g., 15"
                                  value={content.duration}
                                  onChange={(e) => handleContentChange(moduleIndex, contentIndex, e)}
                                />
                              </div>
                              {module.contents.length > 1 && (
                                <Button
                                  type="button"
                                  onClick={() => removeContent(moduleIndex, contentIndex)}
                                  variant="ghost"
                                  size="icon"
                                >
                                  <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Create Course</Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
