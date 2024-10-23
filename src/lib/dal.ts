import 'server-only'

// import { cache } from 'react'
import { cookies } from 'next/headers'
import { unsealSessionCookies } from '@/lib/session/session'
import { UserSession } from '@/types/UserSessionInterfaces'

export async  function verifySession(){
    const cookie = (await cookies()).get('auth.session')?.value
    const session : UserSession = await unsealSessionCookies(cookie)

    console.log( session )
    
    if (!session?.user.id) {
        // redirect('/login')
        return { isAuth: false, userId: null }
    }

    return { isAuth: true, userId: session.user.id }
}

// export const getUser = cache(async () => {
//     const session = await verifySession()
//     if (!session) return null
    
//     try {
//         const data = await session?.userId



//         return 
//     } catch (error) {
//         console.log('Failed to fetch user')
//     return null
//     }
// })