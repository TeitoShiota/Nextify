import { NextRequest, NextResponse } from 'next/server'
import { checkSession } from './lib/middleware/middlewareAuth'

    
export default async function middleware(req: NextRequest) {

    return checkSession(req)
}
    
// Routes Middleware should not run on
export const config = {
    // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}