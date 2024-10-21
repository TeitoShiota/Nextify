import { stringify } from 'querystring';

/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin: 'anonymous',
    async headers() {
        return [
            {
                source: '/auth/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: stringify(process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS) },
                    { key: 'Access-Control-Allow-Origin', value: stringify(process.env.ACCESS_CONTROL_ALLOW_ORIGIN) },
                    { key: 'Access-Control-Allow-Methods', value: stringify(process.env.ACCESS_CONTROL_ALLOW_METHOD) },
                    { key: 'Access-Control-Allow-Headers', value: stringify(process.env.ACCESS_CONTROL_ALLOW_HEADERS) },
                    { key: "Referrer-Policy", value: "same-origin" }
                ],
            },
        ];
    },
};

export default nextConfig;
