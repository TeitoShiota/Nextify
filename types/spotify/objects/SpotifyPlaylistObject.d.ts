type SpotifyPlaylistObject = {
    collaborative: boolean;
    description: string;
    external_urls: SpotifyExternalUrlObject;
    followers: SpotifyFollowersObject;
    href: string;
    id: string;
    images: SpotifyImageObject[];
    name: string;
    owner: SpotifyPublicUserObject;
    primary_color: string | null;
    public: boolean | null;
    snapshot_id: string;
    tracks: SpotifyPagingObject<SpotifyPlaylistTrackObject>;
    type: string;
    uri: string;
};