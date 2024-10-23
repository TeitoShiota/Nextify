import { NextRequest, NextResponse } from 'next/server';

// import createSpotifyApi from '@/utils/spotify';
import { setAuthCookie } from '@/utils/cookies';
import { getAccessToken } from '@/lib/spotify/getAccessToken'

// TYPES
import { UserSession } from '@/types/types';
import { getSpotifyProfile } from '@/lib/spotify/spotifyApi';

//TODO - Remove Refresh token from data and save refresh token separately

export async function GET( req: NextRequest ) {
    const code = req.nextUrl.searchParams.get('code') as string

    if (!code) {
        return new NextResponse(
            JSON.stringify({ error: 'Missing code parameter' }),
            { status: 400 }
        );
    }

    try {
        const data = await getAccessToken( await code )
        const profile = await getSpotifyProfile( data.access_token )

        const session = {
            user: await profile,
            token: await data,
        } as UserSession;
    
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