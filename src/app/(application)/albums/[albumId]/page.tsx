// import { useState, useEffect } from "react"
// import { useSearchParams } from 'next/navigation'

import { getAlbum } from '@/lib/spotify/spotifyApi'
import { getAccessTokenFromCookies } from "@/actions/cookies/sessionCookies"

export default async function AlbumDetailsPage({ 
    params
} : {
    params: Promise<{ albumid : string }>
}){

    const albumId = ( await params )?.albumid as string


    try {
        const response = await getAlbum({
            id: albumId,
            access_token: await getAccessTokenFromCookies()
        });

        return (
            <div>
                <h1>{response.name}</h1>
                <p>{response.artists.map(artist => artist.name).join(', ')}</p>
                <p>{response.release_date}</p>
                <p>{response.total_tracks} tracks</p>
            </div>
        );
    } catch (error) {
        console.error('Error fetching album details:', error);
        return (
            <div>
                <h1>Error</h1>
                <p>Failed to load album details.</p>
            </div>
        );
    }
}