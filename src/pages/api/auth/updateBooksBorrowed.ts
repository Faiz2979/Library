import { db } from "@/../lib/firebaseConfig"
import { doc, updateDoc } from "firebase/firestore"

export const updateBooksBorrowed = async (
  userId: string,
  booksBorrowed: number
): Promise<void> => {
  await updateDoc(doc(db, "users", userId), { booksBorrowed })
}