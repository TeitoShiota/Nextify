const { SPOTIFY_CLIENT_ID, REDIRECT_URI } = process.env;


/**
 * Generates a random string of the specified length.
 *
 * @param length - The length of the random string to generate.
 * @returns A random string consisting of uppercase letters, lowercase letters, and digits.
 */
export function generateRandomString( length : number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);
    
    return Array.from(randomArray, (x) => chars[x % chars.length]).join('');
};

// These are the application scopes you will be request from each user logging in
const default_scopes = [
    // 'streaming',
    // 'user-read-playback-state',
    'user-read-email',
    'user-read-private',
    // 'playlist-read-private',
    // 'playlist-modify-private',
    // 'playlist-modify-public',
];



/**
 * Builds the Spotify authorization URL with the specified scopes and callback URI.
 *
 * @param {string[]} [scopes=default_scopes] - The list of scopes to request authorization for.
 * @param {string} [callback_uri=REDIRECT_URI] - The URI to redirect to after authorization.
 * @returns {string} The complete Spotify authorization URL.
 */
export function buildSpotifyAuthURL (
    scopes: string[] = default_scopes,
    callback_uri: string = REDIRECT_URI
): string {
    return (
        'https://accounts.spotify.com/authorize?' +
        'response_type=code' +
        `&client_id=${SPOTIFY_CLIENT_ID}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&redirect_uri=${encodeURIComponent(callback_uri)}` + 
        `&state=${generateRandomString(16)}`
    );
};
