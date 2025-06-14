import { ArrowRight, BarChart3, Newspaper, PieChart, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar/page"
import Footer from "@/components/Footer/page"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col text-white bg-gradient-to-bl from-neutral-950 to bg-green-800">
    <Navbar></Navbar>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Smarter Stock Analysis & Portfolio Management
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Make data-driven investment decisions with our comprehensive stock market analysis, portfolio management,
              and news impact visualization tools.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4 text-green-500" />
              </Button>
              
            </div>
            <div className="mb-32 w-full max-w-lg rounded-lg borderp-2 ">
              <Image
                src="/hero.png"
                width={1200}
                height={600}
                alt="Dashboard preview"
                className="rounded-md"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 ">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Stock Market Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced technical indicators, pattern recognition, and predictive analytics to help you make informed
                  trading decisions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <PieChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Management</h3>
                <p className="text-muted-foreground">
                  Track performance, optimize asset allocation, and manage risk with our comprehensive portfolio tools.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Newspaper className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">News Impact Visualizer</h3>
                <p className="text-muted-foreground">
                  See how market news affects stock prices in real-time with our innovative visualization tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
    
  )
}
