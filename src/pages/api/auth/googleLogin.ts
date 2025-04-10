import { auth, db } from "@/../lib/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { SignJWT } from "jose";

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

  const expirationTimeInSeconds = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;

  const tokenPayload: TokenFormat = {
    uid,
    email: email || "",
    photoURL: photoURL || defaultPhoto,
    exp: expirationTimeInSeconds,
  };

  const token = await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secretKey);

  return { token };
};
