import querystring from 'querystring';
import { NextApiRequest, NextApiResponse } from 'next';

import createSpotifyApi from '@/utils/spotify';

// We'll describe this function in the next section
import { setAuthCookie } from '@/utils/cookies';


const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;



function sendRefreshRedirect(res: NextResponse, path = '/') {
    res.status(200);
    // Send a 200 response and refresh the page
    return res.send(
        `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
    );
};


//FIXME - Potential invalid response 

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    

    const code = req.query.code as string
    const state = req.query.state as string
    
    console.log(code)


    if (!code) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Missing code parameter',
        });
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
            user: profile,
            token: data,
        };
    
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

        return res.status(500).json({ error: 'Something went wrong' })



        // return res.status(500).json({
        //     statusCode: 500,
        //     message: 'Something went wrong',
        // });
    }
}