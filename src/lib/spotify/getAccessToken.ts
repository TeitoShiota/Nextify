import querystring from 'querystring';

// TYPES
import { SpotifyAccessTokenResponse } from '../../../types/types';

// ENVIRONMENT VARIABLES
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;


export async function getAccessToken( spotify_code : string ) {
    try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            },
            body: querystring.stringify({
                code: spotify_code as string,
                redirect_uri: REDIRECT_URI!,
                grant_type: 'authorization_code',
            }),
        });

        const data : SpotifyAccessTokenResponse = await response.json();

        if (!response.ok) {
            throw new Error((await response.json()).error || 'Failed to fetch access token');
        }

        return await data
    } catch ( error ) {
        throw new Error( error || 'Internal server error while fetching access token' )
    }
}