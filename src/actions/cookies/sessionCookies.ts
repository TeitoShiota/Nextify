'use server';
import 'server-only'


import { cookies } from "next/headers";
import { unsealSessionCookies } from "@/lib/session/session";

export async function getAccessTokenFromCookies(): Promise<string> {
    try {
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get('auth.session')?.value;

        if (!sessionCookie) {
            throw new Error('Session cookie not found');
        }

        const session = await unsealSessionCookies(sessionCookie);
        const access_token = session?.token.access_token;

        if (!access_token) {
            throw new Error('Access token not found in session');
        }

        return access_token as string;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}