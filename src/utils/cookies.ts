import { NextResponse } from 'next/server';
import { serialize, SerializeOptions } from 'cookie';
import { cookies } from 'next/headers';
import Iron from '@hapi/iron';

const { SESSION_SECRET } = process.env;


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

//FIXME - Failed to seal session object TypeError: Cannot read properties of undefined (reading 'set')
// Make sure that session is not undefined

export async function setAuthCookie (
    res: NextResponse,
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
        SESSION_SECRET,
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
    // res.setHeader('Set-Cookie', serialize('auth.session', stringValue, opts));

    // const cookieStore = await cookies();

    // cookieStore().set('auth.session', serialize('auth.session', stringValue, opts))

    // res.setHeader('Set-cookie', serialize('auth.session', stringValue, opts))
    res.headers.set('Set-cookie', serialize('auth.session', stringValue, opts))

    return res

    // return new NextResponse(
    //     headers: {
    //         'Set-cookie': serialize('auth.session', stringValue, opts)
    //     }
    // )

    } catch (error) {
    console.error('Failed to seal session object', error);
    return;
    }
};