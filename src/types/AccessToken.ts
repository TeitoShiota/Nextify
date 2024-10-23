export type SpotifyAccessTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    error: Error;
}

export type SpotifySessionToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export type SpotifyRefreshTokenResponse = {
    access_token: string;
    refresh_token: string;
}