/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        // includePaths: ['styles'],
        prependData: `@import "src/styles/colors"; @import "src/styles/fonts";`
    }
};

export default nextConfig;
