import 'server-only'

import { UserSession } from '../../../types/types';
import { getIronSession, sealData, unsealData } from 'iron-session';
import { cookies } from 'next/headers';

const SESSION_SECRET = process.env.SESSION_SECRET;

//STUB - 
export async function getIronSessionData(session : UserSession){
    try {
        const session = await getIronSession( cookies(), { password: SESSION_SECRET, cookieName: 'auth.session' } );
        return session;
    } catch ( error ) {
        throw new Error( error );
    }
}


//STUB - 
export async function setIronSessionData( newSession : UserSession ){
    try {
        const session = await getIronSession( cookies(), { password: SESSION_SECRET, cookieName: 'auth.session' } );
        // session.session = newSession
        return session;
    } catch ( error ) {
        throw new Error( error );
    }
}

export async function sealSessionCookies(session : UserSession): Promise< string >{
    const signedSession = await sealData(
        session,
        {
            password: await SESSION_SECRET
        },
    );

    const stringValue =
        typeof signedSession === 'object'
        ? 'j:' + JSON.stringify(signedSession)
        : String(signedSession);

    return stringValue;
}

export async function unsealSessionCookies( encryptedSessionCookies ): Promise< UserSession >{
    try {
        const unsealedSession = await unsealData(
            encryptedSessionCookies,
            { 
                password: await SESSION_SECRET
            },
        );
        console.log( unsealedSession )

        return unsealedSession as UserSession;
    } catch ( error ) {
        throw new Error( error )
    }
}