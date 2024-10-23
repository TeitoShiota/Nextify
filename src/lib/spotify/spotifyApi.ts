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