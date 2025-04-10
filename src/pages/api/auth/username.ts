import { auth, db } from "@/../lib/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";


const setUsername = async (newUsername: string): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not authenticated");
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();

        if (newUsername && newUsername !== userData.username) {
            await updateDoc(userDocRef, { username: newUsername });
        } else {
            throw new Error("Username is the same or invalid");
        }
    } else {
        throw new Error("User document not found.");
    }
};


const checkUsername = async (username: string) => {
    const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", username)
    );
    const querySnapshot = await getDocs(usernameQuery);

    if (!querySnapshot.empty) {
        throw new Error("Username is already in use");
    }

}


export { checkUsername, setUsername };

