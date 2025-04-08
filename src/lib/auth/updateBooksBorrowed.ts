import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export const updateBooksBorrowed = async (
  userId: string,
  booksBorrowed: number
): Promise<void> => {
  await updateDoc(doc(db, "users", userId), { booksBorrowed })
}