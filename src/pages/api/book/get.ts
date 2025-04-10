import { db } from "@/../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

//Get book data
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const bookRef = collection(db, "books");
        const snapshot = await getDocs(bookRef);
        const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}