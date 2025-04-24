import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function loanBook(request: NextApiRequest, response: NextApiResponse) {
    
    try{

        if (request.method !== "POST") {
            return response.status(405).json({ error: "Method Not Allowed" });
        }
        
        const { bookId, userId } = request.body;
        
        if (!bookId || !userId) {
            return response.status(400).json({ error: "Missing bookId or userId" });
    }
    const borrowBook = await prisma.$transaction(async (tx) => {
        const book = await tx.book.findUnique({ where: { id: bookId } });
        if (!book || book.stock < 1) {
            return response.status(400).json({ error: "Book not available" });
        };
        
        await tx.book.update({
            where: { id: bookId },
            data: { 
                stock: { decrement: 1 },
                total_borrowed: { increment: 1 }
            },
        });
        
        return await tx.loan.create({
            data: { userId, bookId },
        });
    });
    return response.status(200).json(borrowBook);
} catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal Server Error' });
}
}