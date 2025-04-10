import { auth, db } from "@/../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { SignJWT } from "jose";

const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

export const login = async (
    email: string,
    password: string
): Promise<{ token: string }> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
        throw new Error("User data not found.");
    }

    const { username, photoURL } = userDoc.data();

    const token = await new SignJWT({ uid: user.uid, email, photoURL })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secretKey);

    return { token };
};
