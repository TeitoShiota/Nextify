export type SpotifyTrackObject = {
    album: SpotifyAlbumObject[];
    artists: SpotifyArtistObject[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: SpotifyExternalIdObject;
    external_urls: SpotifyExternalUrlObject;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
};