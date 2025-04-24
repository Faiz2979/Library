import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";



export default async function getall(request:NextApiRequest, response:NextApiResponse){
    if (request.method !== "GET") {
        return response.status(405).json({ error: "Method Not Allowed" });
    }
    const books = await prisma.book.findMany({})

    const returnedBooks = books.map((book) => {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            cover: book.cover,
            addedOn: book.createdAt,
            stock: book.stock,
        }
    })

    return response.status(200).json(returnedBooks);
}