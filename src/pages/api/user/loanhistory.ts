import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function loanHistory(request:NextApiRequest, response:NextApiResponse){
    if (request.method !== "GET") {
        return response.status(405).json({ error: "Method Not Allowed" });
    }
    const { userId } = request.query;
    if (!userId) {
        return response.status(400).json({ error: "Missing userId" });
    }
    const loanHistory = await prisma.loan.findMany({
        where: { userId: String(userId) },
        include: {
            book: true,
        },
    });

    const returnedLoans = loanHistory.map((loan) => {
        return {
            id: loan.id,
            bookId: loan.bookId,
            userId: loan.userId,
            bookTitle: loan.book.title,
            bookAuthor: loan.book.author,
            bookIsbn: loan.book.isbn,
            bookCover: loan.book.cover,
            borrowedOn: loan.loanDate,
        };
    });

    return response.status(200).json(returnedLoans);
    
}