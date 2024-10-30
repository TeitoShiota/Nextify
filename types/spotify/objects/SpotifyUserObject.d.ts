type SpotifyUserObject = {
    display_name: string | null;
    external_urls: SpotifyExternalUrlObject;
    followers: SpotifyFollowersObject;
    href: string;
    id: string;
    images: SpotifyImageObject[];
    type: string;
    uri: string;
};