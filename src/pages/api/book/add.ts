import { db } from "@/lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { title, author, category, totalCopies, coverImage, description } = req.body;

        if (!title || !author || !category || !totalCopies) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newBook = {
            title,
            author,
            category,
            totalCopies,
            availableCopies: totalCopies, // Saat pertama kali ditambahkan, semua salinan tersedia
            borrowCount: 0,
            lastBorrowedAt: null,
            coverImage: coverImage || "", // Jika tidak ada cover, kosongkan
            description: description || "", // Deskripsi opsional
        };
        const docRef = await addDoc(collection(db, "books"), newBook);

        res.status(201).json({ id: docRef.id, ...newBook });
    } catch (error) {
        console.error("Error adding book: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
