// ✅ middleware.ts at the project root

import { doc, getDoc } from "firebase/firestore";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { db } from "./lib/firebaseConfig";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("userToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const decoded = decodeJwt(token) as { uid: string };
        const uid = decoded.uid;

        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        const role = userDoc.exists() ? userDoc.data()?.role : null;

        if (req.nextUrl.pathname.startsWith("/manage") && role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    } catch (err) {
        console.error("Middleware error:", err);
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/manage/:path*", "/dashboard/:path*"], // ✅ paths to apply middleware
};
