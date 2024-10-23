import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation'

// UTILS
import { buildSpotifyAuthURL } from "@/utils/utils";

export async function GET( req: NextRequest ) {
    if ( req.method !== 'GET' ){
        return
    }
    // Redirect all requests to Spotify auth
    redirect(buildSpotifyAuthURL());
}
