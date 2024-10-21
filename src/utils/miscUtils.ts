/**
 * Generates a random string of the specified length.
 *
 * @param length - The length of the random string to generate.
 * @returns A random string consisting of uppercase letters, lowercase letters, and digits.
 */
export function generateRandomString( length : number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);
    
    return Array.from(randomArray, (x) => chars[x % chars.length]).join('');
};


