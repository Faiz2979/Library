// pages/api/books/create.ts
import { cloudinary } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { Fields, File, Files, IncomingForm } from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: { bodyParser: false },
};

export default async function createBook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        /* 1. Parse multipart form */
        const { fields, files } = await new Promise<{
            fields: Fields;
            files: Files;
        }>((resolve, reject) => {
            const form = new IncomingForm({ maxFileSize: 5 * 1024 * 1024 });
            form.parse(req, (err, flds, fls) =>
                err ? reject(err) : resolve({ fields: flds, files: fls })
            );
        });

        /* 2. Normalise values */
        const pick = <T>(v: T | T[] | undefined) => (Array.isArray(v) ? v[0] : v);

        const title = pick(fields.title) as string | undefined;
        const author = pick(fields.author) as string | undefined;
        const isbn = pick(fields.isbn) as string | undefined;
        const stock = Number(pick(fields.stock));
        const cover = pick(files.cover) as File | undefined;

        if (!title || !author || !isbn || Number.isNaN(stock) || !cover) {
            return res.status(400).json({ error: 'Missing or invalid fields' });
        }

        /* 3. ISBN uniqueness */
        if (await prisma.book.findUnique({ where: { isbn } })) {
            return res.status(409).json({ error: 'ISBN already exists' });
        }

        /* 4. Upload cover to Cloudinary */
        const upload = await cloudinary.uploader.upload(cover.filepath, {
            folder: 'book-images',
            public_id: isbn,
        });

        /* 5. Save to DB (use `cover` column) */
        const book = await prisma.book.create({
            data: {
                title,
                author,
                isbn,
                stock,
                cover: upload.secure_url,
            },
            select: {
                id: true,
                title: true,
                author: true,
                isbn: true,
                stock: true,
                cover: true,
                createdAt: true,
            },
        });

        return res.status(201).json({ book });
    } catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
