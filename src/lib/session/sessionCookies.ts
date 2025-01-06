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

export async function checkAccessTokenExpiry() : Promise<boolean> {
    'use server'
    try {
        const authSessionCookie = await cookies().get('auth.session');
        const cookie_expiry_Date = authSessionCookie ? JSON.parse(authSessionCookie.value).expires : null;


        if (cookie_expiry_Date && cookie_expiry_Date <= Date.now() / 1000) {
            // Cookie has expired
            console.log('Cookie has expired');
            // Remove the cookie or update it if necessary
            return false;
        } else {
            // Cookie is still valid
            console.log('Cookie is still valid');
            return true;
        }

    } catch ( error ) {
        throw new Error(JSON.stringify( error ));
        
    }
}