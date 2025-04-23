import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Placement Prep LMS</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Prepare for Your Dream Placement
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our comprehensive learning platform helps college students master the skills needed for successful
                    placement interviews.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Competitive Coding</CardTitle>
                      <CardDescription>Practice coding challenges</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Improve your problem-solving skills with our curated coding challenges.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Study Materials</CardTitle>
                      <CardDescription>Comprehensive resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Access high-quality study materials prepared by industry experts.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Assessments</CardTitle>
                      <CardDescription>Test your knowledge</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Take MCQs, subjective questions, and coding assessments to track your progress.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Progress Tracking</CardTitle>
                      <CardDescription>Monitor your growth</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Track your learning journey with detailed progress reports and analytics.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Placement Prep LMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
