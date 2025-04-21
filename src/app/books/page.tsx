import { Navbar } from "@/components/Navbar";


export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900/80">
      <Navbar></Navbar>
      <h1>Books</h1>
    </div>
  );
}