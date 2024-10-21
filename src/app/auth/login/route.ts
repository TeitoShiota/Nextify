import { generateRandomString } from "@/utils/miscUtils";
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation'

const { SPOTIFY_CLIENT_ID, REDIRECT_URI } = process.env;

// These are the application scopes you will be request from each user logging in
const scopes = [
    'streaming',
    'user-read-playback-state',
    'user-read-email',
    'user-read-private',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public',
];



const buildURL = (scopes: string[], callback: string) => {
    return (
        'https://accounts.spotify.com/authorize?' +
        'response_type=code' +
        `&client_id=${SPOTIFY_CLIENT_ID}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&redirect_uri=${encodeURIComponent(callback)}` + 
        `&state=${generateRandomString(16)}`
    );
};

//FIXME - Potential error in redirect address not receiving a response 

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    if ( req.method !== 'GET' ){
        return
    }
    // Redirect all requests to Spotify auth
    redirect(buildURL(scopes, REDIRECT_URI!));
}
