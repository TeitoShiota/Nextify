import querystring from 'querystring';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';


import createSpotifyApi from '@/utils/spotify';

// We'll describe this function in the next section
import { setAuthCookie } from '@/utils/cookies';


const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;


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


function sendRefreshRedirect(res: NextResponse, path = '/') {
    // res.status(200);
    // Send a 200 response and refresh the page
    // return res.send(
    //     `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
    // );
    redirect(path);
};


//FIXME - Potential invalid response 

export async function GET(req: NextRequest, res: NextResponse) {

    const code = req.nextUrl.searchParams.get('code') as string
    const state = req.nextUrl.searchParams.get('state') as string
    
    console.log(code)


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

        console.log(data)

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch access token');
        }

        const spotify = createSpotifyApi(data.access_token);
    
        const profile = await spotify.getMe();

        console.log(profile)
    
        const session = {
            user: profile.body,
            token: data,
        } as UserSession;
    
        // Send the session information to our user in the form of a cookie header.
        // We'll describe this function in the next step
        await setAuthCookie(res, session, {
          maxAge: data.expires_in * 1000,
        });
    
        // Send 200 response to set cookies and refresh the page
        return sendRefreshRedirect(res);
    } catch (error) {
        // You might want to log the error here

        console.error(error)

        // return res.status(500).json({ error: 'Something went wrong' })
        return new NextResponse(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}