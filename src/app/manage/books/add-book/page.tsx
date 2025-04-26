"use client"

import type React from "react"

import { AlertCircle, ArrowLeft, Book, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddBookPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStatus, setFormStatus] = useState<{
        type: "success" | "error" | null
        message: string
    }>({ type: null, message: "" })

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        totalCopies: 1,
        coverFile: null as File | null, // <<=== tambahkan ini
        description: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const categories = [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Thriller",
        "Romance",
        "Biography",
        "History",
        "Self-Help",
        "Business",
        "Children's",
        "Young Adult",
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "totalCopies" ? Number.parseInt(value) || 0 : value,
        }))

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) newErrors.title = "Title is required"
        if (!formData.author.trim()) newErrors.author = "Author is required"
        if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required"
        if (!formData.category) newErrors.category = "Category is required"
        if (!formData.totalCopies || formData.totalCopies < 1) {
            newErrors.totalCopies = "At least 1 copy is required"
        }
        if (!formData.coverFile) newErrors.coverFile = "Cover image is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        setFormStatus({ type: null, message: "" })

        try {
            const form = new FormData()
            form.append('title', formData.title)
            form.append('author', formData.author)
            form.append('isbn', formData.isbn)
            form.append('stock', formData.totalCopies.toString())
            if (formData.coverFile) {
                form.append('cover', formData.coverFile)
            }

            const response = await fetch("/api/book/add", {
                method: "POST",
                body: form,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to add book")
            }

            setFormStatus({
                type: "success",
                message: "Book added successfully!",
            })

            setFormData({
                title: "",
                author: "",
                isbn: "",
                category: "",
                totalCopies: 1,
                coverFile: null,
                description: "",
            })

            setTimeout(() => {
                router.push("/books")
            }, 2000)
        } catch (error) {
            setFormStatus({
                type: "error",
                message: error instanceof Error ? error.message : "An unknown error occurred",
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/books"
                        className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Books
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Add New Book</h1>
                    <p className="text-gray-400 mt-2">Add a new book to the library collection</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl p-6 md:p-8">
                    {formStatus.type && (
                        <div
                            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${formStatus.type === "success"
                                ? "bg-green-900/30 border border-green-800 text-green-300"
                                : "bg-red-900/30 border border-red-800 text-red-300"
                                }`}
                        >
                            {formStatus.type === "success" ? (
                                <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                                <p className="font-medium">{formStatus.type === "success" ? "Success!" : "Error"}</p>
                                <p className="text-sm">{formStatus.message}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                    Book Title <span className="text-sky-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-800 border ${errors.title ? "border-red-500" : "border-gray-700"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm`}
                                    placeholder="Enter book title"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>
                            {/* ISBN */}
                            <div className="space-y-2">
                                <label htmlFor="isbn" className="block text-sm font-medium text-gray-300">
                                    ISBN <span className="text-sky-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="isbn"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-800 border ${errors.isbn ? "border-red-500" : "border-gray-700"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm`}
                                    placeholder="Enter ISBN number"
                                />
                                {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                            </div>


                            {/* Author */}
                            <div className="space-y-2">
                                <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                                    Author <span className="text-sky-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-800 border ${errors.author ? "border-red-500" : "border-gray-700"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm`}
                                    placeholder="Enter author name"
                                />
                                {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                                    Category <span className="text-sky-500">*</span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-800 border ${errors.category ? "border-red-500" : "border-gray-700"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm`}
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>

                            {/* Total Copies */}
                            <div className="space-y-2">
                                <label htmlFor="totalCopies" className="block text-sm font-medium text-gray-300">
                                    Total Copies <span className="text-sky-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="totalCopies"
                                    name="totalCopies"
                                    min="1"
                                    value={formData.totalCopies}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-800 border ${errors.totalCopies ? "border-red-500" : "border-gray-700"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm`}
                                />
                                {errors.totalCopies && <p className="text-red-500 text-xs mt-1">{errors.totalCopies}</p>}
                            </div>
                        </div>

                        {/* Cover Image URL */}
                        {/* Cover Image Upload */}
                        <div className="space-y-2">
                            <label htmlFor="coverFile" className="block text-sm font-medium text-gray-300">
                                Cover Image <span className="text-sky-500">*</span>
                            </label>
                            <input
                                type="file"
                                id="coverFile"
                                name="coverFile"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            coverFile: file,
                                        }))
                                    }
                                }}
                                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                            />
                            {errors.coverFile && <p className="text-red-500 text-xs mt-1">{errors.coverFile}</p>}
                        </div>


                        {/* Description */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                Description <span className="text-gray-500">(optional)</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                                placeholder="Enter book description"
                            ></textarea>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white py-2.5 px-6 rounded-md transition-colors duration-200 font-medium ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Book className="h-5 w-5" />
                                        Add Book
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push("/books")}
                                className="bg-transparent border border-gray-700 hover:border-gray-600 text-white py-2.5 px-6 rounded-md transition-colors duration-200 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Text */}
                <div className="mt-6 bg-sky-900/20 border border-sky-900/50 rounded-lg p-4 flex items-start gap-3">
                    <div>
                        <p className="text-sky-400 font-medium text-sm">Lorem ipsum dolor sit amet</p>
                        <p className="text-gray-400 text-xs mt-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit rem voluptates ratione corporis dignissimos, accusantium, praesentium accusamus numquam, soluta sed earum nostrum laboriosam pariatur quas atque vitae provident ducimus cumque!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

