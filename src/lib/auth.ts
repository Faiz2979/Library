import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Fungsi untuk menyimpan token ke localStorage
const saveToken = (user: User, role: string) => {
  const token = JSON.stringify({
    uid: user.uid,
    email: user.email,
    role,
  });
  localStorage.setItem("userToken", token);
};

// Fungsi untuk mendapatkan role dari token di localStorage
export const getUserRole = (): string | null => {
  const token = localStorage.getItem("userToken");
  if (!token) return null;
  try {
    const parsed = JSON.parse(token);
    return parsed.role;
  } catch {
    return null;
  }
};

// REGISTER
export const register = async (email: string, password: string, role: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan user role ke Firestore
    await setDoc(doc(db, "users", user.uid), { role, booksBorrowed: 0 });

    // Simpan token di localStorage
    saveToken(user, role);

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// LOGIN
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Ambil role dari Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data()?.role || "user" : "user";

    // Simpan token di localStorage
    saveToken(user, role);

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// LOGOUT
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem("userToken");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// LOGIN WITH GOOGLE
export const loginWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Cek apakah user sudah ada di Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    let role = "user";

    if (!userDoc.exists()) {
      // Assign default role jika user baru
      await setDoc(doc(db, "users", user.uid), { role, booksBorrowed: 0 });
    } else {
      role = userDoc.data()?.role || "user";
    }

    // Simpan token di localStorage
    saveToken(user, role);

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// UPDATE BOOKS BORROWED
export const updateBooksBorrowed = async (userId: string, booksBorrowed: number): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { booksBorrowed });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
