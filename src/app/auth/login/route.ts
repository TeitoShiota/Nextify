import { generateRandomString } from "@/utils/miscUtils";
import { NextApiRequest, NextApiResponse } from 'next';

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
// const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET ;

const scope =   "streaming \
                user-read-email \
                user-read-private"

const state = generateRandomString(16);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:3000/auth/callback",
        state: state
    })

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
}
