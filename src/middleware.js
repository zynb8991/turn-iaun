import { NextResponse } from "next/server";
import authToken from "./lib/authToken";

export async function middleware(request) {
    const isLoggedIn = await authToken();
    if(!isLoggedIn) return NextResponse.redirect(new URL('/login', request.url));

    return null;
}

export const config = {
    matcher: ['/'],
}