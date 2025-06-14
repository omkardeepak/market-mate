import Link from "next/link"
import { TrendingUp} from "lucide-react"


export default function Navbar(){
    return (
        <header className="sticky top-0 z-50 w-full border-b  backdrop-blur ">
        <div className="container flex h-16 items-center gap-[350px] pl-4 text-white ">
          <div className="flex items-center gap-2 text-white">
            <TrendingUp className="h-8 w-8 text-green-500 " />
            <div className="text-white">
            <span className="text-xl font-bold">Market • MATE</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center justify-center gap-6">
            <Link href="/report-analyser" className="text-sm font-medium hover:underline">
              Report Analyser
            </Link>
            <Link href="/optimize-portfolio" className="text-sm font-medium hover:underline">
              Portfolio Optimizer
            </Link>
            <Link href="/market-impact" className="text-sm font-medium hover:underline">
              Market Impact Visualizer
            </Link>
          </nav>
        </div>
      </header>

    )
}