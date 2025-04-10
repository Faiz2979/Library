import HeaderSection from "@/components/Home-section/HeaderSection";
import HowItWorks from "@/components/Home-section/HowItWorks";
import PopularBook from "@/components/Home-section/PopularBook";
import { Navbar } from "@/components/Navbar";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900/80">
      <Navbar></Navbar>
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 w-full py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <HeaderSection></HeaderSection>
          <HowItWorks></HowItWorks>
          <PopularBook></PopularBook>
        </div>
      </div>
    </div>
  )
}

