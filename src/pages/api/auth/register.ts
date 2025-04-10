import { auth, db } from "@/../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { checkUsername } from "./username";

export const register = async (
    email: string,
    password: string,
    username: string,
    role: string = "user"
): Promise<{ uid: string; email: string; username: string; role: string; photoURL: string }> => {
    // verify that the Username isn't already use
    const Username =await checkUsername(username)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    const photoURL = `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}`
        
    await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        photoURL,
        role,
        booksBorrowed: 0,
        createdAt: new Date()
    })

    return {
        uid: user.uid,
        email,
        username,
        role,
        photoURL
    }
}
