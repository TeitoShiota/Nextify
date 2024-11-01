import { cookies } from "next/headers";
import { unsealSessionCookies } from "./session";

export async function getAccessTokenFromCookies() : Promise<string> {
    'use server'
    try {
        const access_token = ( await unsealSessionCookies(
            ( await cookies()).get('auth.session' )?.value
        ))?.token.access_token

        return access_token as string
    } catch ( error ) {
        throw new Error(JSON.stringify( error ));
        
    }
}