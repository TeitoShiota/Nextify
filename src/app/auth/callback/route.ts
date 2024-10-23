import querystring from 'querystring';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

// UTILS
import createSpotifyApi from '@/utils/spotify';
import { setAuthCookie } from '@/utils/cookies';

// TYPES
import { UserSession } from '@/types/types';

// ENVIRONMENT VARIABLES
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;


//FIXME - Potential invalid response 

export async function GET(req: NextRequest, res: NextResponse) {

    const code = req.nextUrl.searchParams.get('code') as string
    const state = req.nextUrl.searchParams.get('state') as string


    if (!code) {
        return new NextResponse(
            JSON.stringify({ error: 'Missing code parameter' }),
            { status: 400 }
        );
    }


    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            },
            body: querystring.stringify({
                code: code as string,
                redirect_uri: REDIRECT_URI!,
                grant_type: 'authorization_code',
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch access token');
        }

        const spotify = createSpotifyApi(data.access_token);

        const profile = await spotify.getMe();
    
        const session = {
            user: profile.body,
            token: data,
        } as UserSession;
    
        // Send the session information to our user in the form of a cookie header.
        // We'll describe this function in the next step
        await setAuthCookie(
            session,
            {
            maxAge: data.expires_in * 1000,
        });

        return NextResponse.redirect(
            new URL('/', req.url)
        )
    
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}