import { BookOpen, Clock, Link } from "lucide-react";


export default function PopularBook() {
    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Most Borrowed Books</h3>
                <Link
                    href="/books/popular"
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                    View all <span className="text-lg">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "The Silent Patient", author: "Alex Michaelides", borrows: 342, category: "Thriller" },
                    { title: "Atomic Habits", author: "James Clear", borrows: 289, category: "Self-Help" },
                    { title: "The Midnight Library", author: "Matt Haig", borrows: 256, category: "Fiction" },
                    { title: "Educated", author: "Tara Westover", borrows: 231, category: "Memoir" },
                ].map((book, index) => (
                    <div
                        key={index}
                        className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden hover:border-sky-700 transition-all duration-300 group"
                    >
                        <div className="h-48 bg-gradient-to-br from-sky-900/40 to-indigo-900/40 relative">
                            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=150')] bg-cover bg-center opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="absolute top-2 right-2 bg-sky-600/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {book.category}
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="text-white font-semibold mb-1 truncate">{book.title}</h4>
                            <p className="text-gray-400 text-sm mb-3">by {book.author}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" /> {book.borrows} borrows
                                </span>
                                <span className="text-xs bg-sky-900/50 text-sky-400 px-2 py-1 rounded-full flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> 14 days
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}