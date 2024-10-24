import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from '@/lib/dal';

export async function checkSession(request: NextRequest): Promise<NextResponse<unknown>> {
    const response : NextResponse = NextResponse.next({
        request
    })


    // if ( request.nextUrl.pathname === '/auth/login' ){ return response }
    const isAuth = await verifySession();

    try {
        if ( ( isAuth ).isAuth && request.nextUrl.pathname === '/login' ){
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    } catch ( error ) {
        throw new Error( error );
    }

    try {
        if ( 
            request.nextUrl.pathname !== '/login' &&
            request.nextUrl.pathname !== '/auth/login' &&
            request.nextUrl.pathname !== '/auth/callback' &&
            !(isAuth).isAuth
        ){
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
    } catch ( error ) {
        throw new Error( error );
    }


    return response
}