type SpotifySavedAlbumObject = {
    album_type: 'album' | 'single' | 'compilation';
    artists: SpotifySimplifiedArtistObject[];
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
};