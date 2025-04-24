// pages/api/leaderboard.ts
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getLeaderboard(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // ❶ Fetch top-10 users with the most loans
        const leaderboard = await prisma.user.findMany({
            take: 10,
            orderBy: { loans: { _count: 'desc' } },
            select: {
                id: true,
                username: true,
                _count: { select: { loans: true } },
            },
        });

        // ❷ Optional: grand‑total across the top‑10 (already in memory)
        const totalLoans = leaderboard.reduce(
            (sum, u) => sum + u._count.loans,
            0
        );

        return res.status(200).json({ totalLoans, leaderboard });
    } catch (err) {
        console.error('Error fetching leaderboard:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
