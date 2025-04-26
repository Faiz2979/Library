'use client'

import BookCard from "@/components/BookCard";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";


export default function Page() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/book/getall");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col  bg-gray-900/80">
      <Navbar></Navbar>
      <div className="bg-gradient-to-b from-gray-900 min-h-screen to-gray-950 w-full py-16 md:py-24">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 p-4">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}