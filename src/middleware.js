import { NextResponse } from "next/server";
import authToken from "./lib/authToken";

const roles = {
    student: ['/rezervturn', '/historyturns', '/noaccess', '/api', '/logout'],
    teacher: ['/dashboard', '/managementturn', '/noaccess', '/api', '/logout'],
    admin: ['/dashboard', '/managementturn', '/teacher', '/info', '/noaccess', '/api', '/logout']
}
export async function middleware(request) {
    const isLoggedIn = await authToken();
    if(!isLoggedIn) {
        
        return NextResponse.rewrite(new URL('/login', request.url));
    }
    if(request.nextUrl.pathname === '/') {
        if(isLoggedIn.role === 'student') 
            return NextResponse.rewrite(new URL(`/studentturn/rezervturn/${isLoggedIn._id}`, request.url));
        else  
            return NextResponse.rewrite(new URL('/dashboard', request.url));
    }
    const pathName = (request.nextUrl.pathname.split('/')[2] === undefined ? request.nextUrl.pathname.split('/')[1] : request.nextUrl.pathname.split('/')[2]);
    if(!roles[isLoggedIn.role].includes('/' + pathName)) {
        return null;
    }



    return null;
}

export const config = {
    matcher: ['/', '/((?!api|_next/static|_next/images|favicon.ico|fonts/).*)', '/login', '/register'],
}