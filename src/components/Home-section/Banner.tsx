import { Award, BookOpen, Calendar, CheckCircle, Clock, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function BorrowingSection() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 w-full py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-sky-900/50 text-sky-400 rounded-full mb-4">
            Easy Borrowing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Borrow Books With Ease</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our streamlined borrowing system makes it simple to access thousands of titles. Enjoy flexible loan periods
            and convenient renewal options.
          </p>
        </div>

        {/* How It Works */}
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

        {/* Popular Borrowed Books */}
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

        {/* Membership Benefits */}
        <div className="bg-gradient-to-r from-sky-900/30 to-indigo-900/30 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-sky-900/50 text-sky-400 rounded-full mb-4">
                Premium Access
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Become a Premium Member</h3>
              <p className="text-gray-300 mb-6">
                Upgrade to premium membership for exclusive borrowing benefits and priority access to new releases.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Borrow up to 10 books simultaneously",
                  "Extended borrowing periods up to 45 days",
                  "Free home delivery and pickup",
                  "Priority reservations for new releases",
                  "Access to exclusive digital content",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/membership/premium"
                className="bg-sky-600 hover:bg-sky-700 text-white py-3 px-8 rounded-md transition-colors duration-200 font-medium inline-block"
              >
                Upgrade Now
              </Link>
            </div>

            <div className="w-full md:w-1/2 bg-gradient-to-br from-sky-900/40 to-indigo-900/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=400')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>

              {/* Decorative elements */}
              <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-sky-500/10 backdrop-blur-md animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-indigo-500/10 backdrop-blur-md animate-pulse delay-1000"></div>

              {/* Testimonial */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-sky-900/50 flex items-center justify-center">
                      <Award className="h-6 w-6 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-400 text-sm">Premium Member</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "The premium membership has completely transformed my reading experience. I love the extended
                    borrowing periods and home delivery service!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

