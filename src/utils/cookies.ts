import { NextResponse } from 'next/server';
import { serialize, SerializeOptions } from 'cookie';
import { cookies } from 'next/headers';

import { UserSession } from '@/types/types';
import { sealSessionCookies } from '@/lib/session/session';

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in environment variables');
}


//FIXME - Failed to seal session object TypeError: Cannot read properties of undefined (reading 'set')
// Make sure that session is not undefined

export async function setAuthCookie (
    session: UserSession,
    options: SerializeOptions = {},
): Promise<void> {
    const defaults: SerializeOptions = {
        maxAge: 3600 * 1000 * 5,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    };
    const opts: SerializeOptions = { ...defaults, ...options };

    try {

        if ('maxAge' in opts) {
            opts.expires = new Date(Date.now() + opts.maxAge!);
            opts.maxAge! /= 1000;
        }

        const cookieStore = await cookies()

        // Set the cookie
        cookieStore.set('auth.session', await sealSessionCookies(session), opts)

        return

    } catch (error) {
        console.error('Failed to seal session object', error);
    return;
    }
};