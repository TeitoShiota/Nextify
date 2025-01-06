'use server'

import 'server-only'

// import { cache } from 'react'
import { cookies } from 'next/headers'
import { unsealSessionCookies } from '@/lib/session/session'
import { UserSession } from '../../types/UserSessionInterfaces'
import { refreshAccessToken } from '@/lib/spotify/refreshAccessToken'

export async function verifySession(){
    try {
        const cookie = (await cookies()).get('auth.session')?.value
        const session : UserSession = await unsealSessionCookies(cookie)
        

        //FIXME - Implement a way to refresh the access token if it has expired
        const isCookieExpired = await checkAccessTokenExpiry();
        if (!isCookieExpired) {
            try {
                const new_token = await refreshAccessToken(session?.token.refresh_token);
                session.token.access_token = new_token.access_token;
                session.token.refresh_token = new_token.refresh_token;
                cookies().set('auth.session', JSON.stringify(session), {
                    expires: new Date(Date.now() + 3600 * 1000),
                });
            } catch (error) {
                throw new Error(error || 'Failed to refresh access token');
            }
        }



        if (!session?.user.id) {
            return { isAuth: false, userId: null }
        }
        
        return { isAuth: true, userId: session.user.id }
    } catch {
        return { isAuth: false, userId: null }
    }
}

export async function checkAccessTokenExpiry() : Promise<boolean> {
    'use server'
    try {
        const authSessionCookie = await cookies().get('auth.session');
        const cookie_expiry_Date = authSessionCookie ? JSON.parse(authSessionCookie.value).expires : null;
        console.log('cookie_expiry_Date', cookie_expiry_Date);

        if (cookie_expiry_Date && cookie_expiry_Date <= Date.now() / 1000) {
            // Cookie has expired
            console.log('Cookie has expired');
            // Remove the cookie or update it if necessary
            return false;
        } else {
            // Cookie is still valid
            console.log('Cookie is still valid');
            return true;
        }

    } catch ( error ) {
        throw new Error(JSON.stringify( error ));
        
    }
}