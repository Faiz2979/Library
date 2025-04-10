import { doc, getDoc } from "firebase/firestore";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { db } from "./lib/firebaseConfig";

const protectedAdminRoutes = ["/dashboard", "/manage"]; // example routes only for admins

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("userToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const decoded = decodeJwt(token) as { uid: string };

        if (!decoded?.uid) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", decoded.uid));

        if (!userDoc.exists()) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        const userData = userDoc.data();
        const role = userData.role || "user";

        // If trying to access an admin-only route
        if (protectedAdminRoutes.some(path => req.nextUrl.pathname.startsWith(path))) {
            if (role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url)); // redirect non-admin to home
            }
        }

        // Optionally: attach user role to request (not required)
        // req.headers.set('x-user-role', role); ← this won't persist unless handled server-side

        return NextResponse.next();
    } catch (err) {
        console.error("Middleware error:", err);
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}
