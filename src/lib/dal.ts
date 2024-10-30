import 'server-only'

// import { cache } from 'react'
import { cookies } from 'next/headers'
import { unsealSessionCookies } from '@/lib/session/session'
import { UserSession } from '../../types/UserSessionInterfaces'

export async  function verifySession(){
    try {
        const cookie = (await cookies()).get('auth.session')?.value
        const session : UserSession = await unsealSessionCookies(cookie)
                
        if (!session?.user.id) {
            return { isAuth: false, userId: null }
        }
        
        return { isAuth: true, userId: session.user.id }
    } catch ( error ) {
        return { isAuth: false, userId: null }
    }
}