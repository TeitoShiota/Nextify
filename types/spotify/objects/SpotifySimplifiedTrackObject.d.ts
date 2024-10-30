type SpotifySimplifiedTrackObject = {
    artists: SpotifySimplifiedArtistObject[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: SpotifyExternalUrlObject;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: SpotifyLinkedTrackObject;
    restrictions: SpotifyTrackRestrictionObject;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
};