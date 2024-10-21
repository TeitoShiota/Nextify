import { NextApiResponse } from 'next';
import { serialize, SerializeOptions } from 'cookie';
import Iron from '@hapi/iron';

const { SPOTIFY_SESSION_SECRET } = process.env;


export interface UserSession {
    user: {
    id: string;
    display_name: string;
    email: string;
    images: {
        width: number;
        height: number;
        url: string;
    }[];
    };
    token: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    };
}

export async function setAuthCookie (
    res: NextApiResponse,
    session: UserSession,
    options: SerializeOptions = {},
) {
    const defaults: SerializeOptions = {
        maxAge: 3600 * 1000 * 5,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    };
    const opts: SerializeOptions = { ...defaults, ...options };

    try {
    // We're encrypting our session here using the SESSION_SECRET defined in our
    // .env file.
    const signedSession = await Iron.seal(
        session,
        SPOTIFY_SESSION_SECRET!,
        Iron.defaults,
    );

    const stringValue =
        typeof signedSession === 'object'
        ? 'j:' + JSON.stringify(signedSession)
        : String(signedSession);

    if ('maxAge' in opts) {
        opts.expires = new Date(Date.now() + opts.maxAge!);
        opts.maxAge! /= 1000;
    }

    // Set the cookie in the header of the response
    res.setHeader('Set-Cookie', serialize('auth.session', stringValue, opts));
    } catch (error) {
    console.error('Failed to seal session object', error);
    return;
    }
};