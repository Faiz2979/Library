import { BookOpen, Clock } from "lucide-react";

interface Book {
    cover: string;
    category: string;
    title: string;
    author: string;
    borrows: number;
}

export default function BookCard({ book }: { book: Book }) {
    return (
        <div>

            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden hover:border-sky-700 transition-all duration-300 group">
                <div className="h-48 relative">
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${book.cover})` }}></div>
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
        </div>
    )
}