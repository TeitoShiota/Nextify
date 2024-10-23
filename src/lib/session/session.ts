import Iron from '@hapi/iron';

import { UserSession } from '@/types/types';

const SESSION_SECRET = process.env.SESSION_SECRET;

export async function sealSessionCookies(session : UserSession){
    const signedSession = await Iron.seal(
        await session,
        await SESSION_SECRET,
        Iron.defaults,
    );

    const stringValue =
        typeof signedSession === 'object'
        ? 'j:' + JSON.stringify(signedSession)
        : String(signedSession);

    return stringValue;
}

export async function unsealSessionCookies( encryptedSessionCookies ){
    const unsealedSession = await Iron.unseal(
        encryptedSessionCookies,
        SESSION_SECRET,
        Iron.defaults
    );

    return await unsealedSession;
}
