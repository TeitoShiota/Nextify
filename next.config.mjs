/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        // includePaths: ['styles'],
        prependData: `@import "src/styles/colors"; @import "src/styles/fonts";`
    },
    images: {
        domains: ['i.scdn.co'],
    },
};

export default nextConfig;
