type SpotifyAlbumObject = {
    album_type: 'album' | 'single' | 'compilation';
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrlObject;
    href: string;
    id: string;
    images: SpotifyImageObject[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: SpotifyRestrictionsObject;
    type: string;
    uri: string;
    artists: SpotifySimplifiedArtistObject[];
    tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: SpotifySimplifiedTrackObject[];
    };
    copyright: SpotifyCopyrightsObject;
    external_ids: SpotifyExternalIdObject;
    genres: string[];
    label: string;
    popularity: number;
}