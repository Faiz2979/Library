import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { SignJWT } from "jose";
import { auth, db } from "../firebaseConfig";

const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

export const loginWithGoogle = async (): Promise<{ token: string }> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const { uid, displayName, email, photoURL } = user;
  let role = "user";

  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  const defaultPhoto = `https://api.dicebear.com/7.x/thumbs/svg?seed=${displayName}`;

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      username: displayName || "Unknown",
      email: email || "",
      photoURL: photoURL || defaultPhoto,
      role,
      booksBorrowed: 0,
      createdAt: new Date(),
    });
  } else {
    await updateDoc(userRef, {
      username: displayName || "",
      email: email || "",
      photoURL: photoURL || "",
    });
    role = userDoc.data()?.role || "user";
  }

  const token = await new SignJWT({ uid, email, username: displayName, role, photoURL: photoURL || defaultPhoto })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secretKey);

  return { token };
};
