import querystring from 'querystring';


// TYPES
import { SpotifyRefreshTokenResponse } from '../../../types/types';


// ENVIRONMENT VARIABLES
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;


/**
 * Refreshes the Spotify access token using the provided refresh token.
 *
 * @param {string} refresh_token - The refresh token used to obtain a new access token.
 * @returns {Promise<SpotifyRefreshTokenResponse>} A promise that resolves to the new access token response.
 * @throws Will throw an error if the token refresh process fails.
 */
export async function refreshAccessToken( refresh_token : string ): Promise<SpotifyRefreshTokenResponse>{
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            },
            body: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            }),
        });

        const data: SpotifyRefreshTokenResponse = await response.json();

        return data 

    } catch ( error ) {
        throw new Error( error || 'Failed to refresh access token' )
    }
}