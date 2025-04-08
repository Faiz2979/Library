import { auth, db } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

export const register = async (
    email: string,
    password: string,
    username: string,
    role: string = "user"
): Promise<{ uid: string; email: string; username: string; role: string; photoURL: string }> => {
    // verify that the Username isn't already use
    const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", username)
    );
    const querySnapshot = await getDocs(usernameQuery);

    if (!querySnapshot.empty) {
        throw new Error("Username is already in use");
    }
    
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
