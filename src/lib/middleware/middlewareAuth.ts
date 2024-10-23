import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { unsealSessionCookies } from '@/lib/session/session'
import { verifySession } from '@/lib/dal';

export async function checkSession(request: NextRequest): Promise<NextResponse<unknown>> {
    const response : NextResponse = NextResponse.next({
        request
    })

    // const cookie = (await cookies()).get('session')?.value
    // const session = await unsealSessionCookies(cookie)

    // if ( await !session.user.id ) {
    //     const url = request.nextUrl.clone()
    //     url.pathname = '/login'
    //     return NextResponse.redirect(url)
    // }


    return response
}