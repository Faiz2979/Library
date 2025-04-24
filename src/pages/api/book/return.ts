import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function returnBook(request: NextApiRequest, response: NextApiResponse) {
    
    try{

        if (request.method !== "POST") {
            return response.status(405).json({ error: "Method Not Allowed" });
        }
        
    const { bookId, userId } = request.body;
    
    if (!bookId || !userId) {
        return response.status(400).json({ error: "Missing bookId or userId" });
    }
    const returnBook = await prisma.$transaction(async (tx) => {
        const loan = await tx.loan.findUnique({
            where: { id: bookId },
        });
        if (!loan) throw new Error('Loan not found');
        
        await tx.book.update({
            where: { id: loan.bookId },
            data: { stock: { increment: 1 } },
        });
        
        return await tx.loan.delete({
            where: { id: bookId },
        });
    });
    return response.status(200).json(returnBook);
} catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal Server Error' });
}
}