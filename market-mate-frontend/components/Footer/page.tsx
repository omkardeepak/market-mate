import { Button } from "@/components/ui/button"
import { ArrowRight,TrendingUp} from "lucide-react"
import Link from "next/link"



export default function Navbar(){
    return (
        <div>
                <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Investment Strategy?</h2>
            <p className="max-w-2xl mx-auto mb-10">
              Join thousands of investors who are making smarter decisions with StockSense.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
              <footer className="border-t p-10 bg-neutral-900">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <span className="text-xl font-bold">StockSense</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact Us
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              FAQ
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StockSense. All rights reserved.
          </div>
        </div>
      </footer>
      </div>

    )
}