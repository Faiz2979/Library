import { BookOpen, Calendar, RotateCcw } from "lucide-react";



export default function HowItWorks() {
    return (
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">How Borrowing Works</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <BookOpen className="h-8 w-8 text-sky-500" />,
                        title: "Choose Your Books",
                        description: "Browse our collection and select up to 5 books at a time to borrow.",
                    },
                    {
                        icon: <Calendar className="h-8 w-8 text-sky-500" />,
                        title: "Set Loan Period",
                        description: "Select a borrowing period from 7 to 30 days based on your needs.",
                    },
                    {
                        icon: <RotateCcw className="h-8 w-8 text-sky-500" />,
                        title: "Return or Renew",
                        description: "Return books to any drop-off point or renew online up to 3 times.",
                    },
                ].map((step, index) => (
                    <div key={index} className="relative">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full hover:border-sky-700 transition-all duration-300 hover:translate-y-[-5px]">
                            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
                                {index + 1}
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 p-3 bg-gray-900/80 rounded-full">{step.icon}</div>
                                <h4 className="text-white text-lg font-semibold mb-2">{step.title}</h4>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}