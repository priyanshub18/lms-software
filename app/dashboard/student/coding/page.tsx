"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

export default function CodingPracticePage() {
  const [difficulty, setDifficulty] = useState("all")
  const [category, setCategory] = useState("all")

  // Mock coding problems data
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "easy",
      category: "arrays",
      solved: true,
      attempts: 2,
    },
    {
      id: 2,
      title: "Valid Parentheses",
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      difficulty: "easy",
      category: "stacks",
      solved: true,
      attempts: 1,
    },
    {
      id: 3,
      title: "Merge Two Sorted Lists",
      description: "Merge two sorted linked lists and return it as a sorted list.",
      difficulty: "easy",
      category: "linked-lists",
      solved: false,
      attempts: 0,
    },
    {
      id: 4,
      title: "LRU Cache",
      description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
      difficulty: "medium",
      category: "design",
      solved: false,
      attempts: 3,
    },
    {
      id: 5,
      title: "Course Schedule",
      description:
        "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.",
      difficulty: "medium",
      category: "graphs",
      solved: true,
      attempts: 4,
    },
    {
      id: 6,
      title: "Trapping Rain Water",
      description:
        "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      difficulty: "hard",
      category: "arrays",
      solved: false,
      attempts: 2,
    },
  ]

  // Filter problems based on selected filters
  const filteredProblems = problems.filter((problem) => {
    if (difficulty !== "all" && problem.difficulty !== difficulty) return false
    if (category !== "all" && problem.category !== category) return false
    return true
  })

  // Get difficulty badge variant
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "success"
      case "medium":
        return "warning"
      case "hard":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Coding Practice</h1>
          <p className="text-muted-foreground">Practice coding problems to prepare for technical interviews</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={(value) => setDifficulty(value)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="easy">Easy</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="hard">Hard</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <span className="text-sm">Category:</span>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="arrays">Arrays</SelectItem>
                <SelectItem value="strings">Strings</SelectItem>
                <SelectItem value="linked-lists">Linked Lists</SelectItem>
                <SelectItem value="stacks">Stacks & Queues</SelectItem>
                <SelectItem value="trees">Trees & Graphs</SelectItem>
                <SelectItem value="design">System Design</SelectItem>
                <SelectItem value="graphs">Graphs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.map((problem) => (
            <Card key={problem.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>{problem.title}</CardTitle>
                  <Badge variant={getDifficultyBadge(problem.difficulty) as any} className="capitalize">
                    {problem.difficulty}
                  </Badge>
                </div>
                <CardDescription className="capitalize">{problem.category.replace("-", " ")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-3">{problem.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  {problem.solved ? (
                    <span className="text-green-500">Solved in {problem.attempts} attempt(s)</span>
                  ) : problem.attempts > 0 ? (
                    <span>{problem.attempts} attempt(s)</span>
                  ) : (
                    <span>Not attempted</span>
                  )}
                </div>
                <Button variant={problem.solved ? "outline" : "default"}>
                  {problem.solved ? "Review Solution" : "Solve Problem"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
