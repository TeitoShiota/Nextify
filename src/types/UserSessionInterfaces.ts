export interface UserSession {
    user: {
        id: string;
        country : string;
        display_name: string;
        email: string;
        explicit_content: { filter_enabled: boolean, filter_locked: boolean };
        external_urls: { any };
        followers: { any }
        href: string;
        images: {
            width: number;
            height: number;
            url: string;
        }[];
        product: string;
        type: string;
        uri: string
    };
    token: {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
    };
}