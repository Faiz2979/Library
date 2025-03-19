import Banner from "@/components/Home-section/Banner";
import { Navbar } from "@/components/Navbar";

export default function GramediaHomepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900/80">
      <Navbar></Navbar>
      <Banner></Banner>
    </div>
  )
}

