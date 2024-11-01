import createSpotifyApi from '@/utils/spotify';

/**
 * Fetches the current user's profile from Spotify.
 *
 * @param {string} access_token - The access token used to authenticate the request.
 * @returns {Promise<SpotifyApi.CurrentUsersProfileResponse>} - A promise that resolves to the user's profile data.
 * @throws {Error} - Throws an error if the profile fetch fails.
 */
export async function getSpotifyProfile( access_token ): Promise<SpotifyApi.CurrentUsersProfileResponse> {
    try {
        const spotify = createSpotifyApi(await access_token);
        const profile = (await (spotify.getMe())).body;

        return profile
    } catch ( error ) {
        throw new Error( error || 'Failed to fetch user profile' )
    }
}



export async function getAlbumNewReleases(
{ 
    limit = 20,
    offset = 0,
    access_token
}: {
    limit?: number;
    offset?: number;
    access_token: string;
}): Promise<SpotifyApi.ListOfNewReleasesResponse>
{
    if ( limit < 0 || limit > 50 ) { throw new Error('Limit must be between 0 and 50'); }

    if ( offset < 0 ) { throw new Error('Invalid Offset value'); }

    // Function implementation here

    try {
        const uri = `https://api.spotify.com/v1/browse/new-releases?limit=${ limit }&offset=${ offset }`

        const response = await fetch( 
            uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            }
        )

        const data : SpotifyApi.ListOfNewReleasesResponse = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch list of new album releases');
        }

        return data

    } catch ( error ) {
        throw new Error('Failed to fetch list of new album releases');
    }
}

export async function getAlbum(
    { 
        id,
        market,
        access_token
    }: {
        id: string;
        market?: string;
        access_token: string;
    }): Promise<SpotifyApi.AlbumObjectFull>
    {
        if (!id || !/^[a-zA-Z0-9]{22}$/.test(id)) {
            throw new Error('Invalid base62 id');
        }
    
        // Validate the market parameter to ensure it fits the ISO 3166-1 alpha-2 country code
        if (market && !/^[A-Z]{2}$/.test(market)) {
            throw new Error('Market must be a valid ISO 3166-1 alpha-2 country code');
        }
    
        // Function implementation here
    
        try {
            const uri = `https://api.spotify.com/v1/albums/${ id }${market ? `?market=${ await market }` : ''}`;
    
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            });
    
            const data : SpotifyApi.AlbumObjectFull = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to fetch album');
            }
    
            return data
    
        } catch ( error ) {
            console.error(error)
            throw new Error('Failed to fetch list of album');
        }
    } 

    // https:/api.spotify.com/v1/albums/0JvWGbkCMpAdbPVlczwKDx
// .ListOfFeaturedPlaylistsResponse