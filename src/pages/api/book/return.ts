// pages/api/book/return.ts
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function returnBook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { loanId, userId } = req.body as {
        loanId?: string;
        userId?: string;
    };

    if (!loanId || !userId) {
        return res.status(400).json({ error: 'Missing loanId or userId' });
    }

    try {
        const updatedLoan = await prisma.$transaction(async (tx) => {
            /** 1. Find loan & verify owner */
            const loan = await tx.loan.findUnique({
                where: { id: loanId },
            });
            if (!loan || loan.userId !== userId || loan.status !== 'BORROWED') {
                throw new Error('Invalid loan');
            }

            /** 2. Update loan record */
            const loanUpdate = tx.loan.update({
                where: { id: loanId },
                data: {
                    status: 'RETURNED',
                    returnDate: new Date(),
                },
                select: {
                    id: true,
                    bookId: true,
                    status: true,
                    returnDate: true,
                },
            });

            /** 3. Restore book stock */
            const bookUpdate = tx.book.update({
                where: { id: loan.bookId },
                data: { stock: { increment: 1 } },
            });

            // Execute both in the same transaction
            const loanRes = await loanUpdate;
            await bookUpdate;
            return loanRes;
        });

        return res.status(200).json({ loan: updatedLoan });
    } catch (e: any) {
        console.error('Return error:', e);
        return res.status(400).json({ error: e.message || 'Return failed' });
    }
}
