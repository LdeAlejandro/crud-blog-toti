/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            },
        ],
        domains: ["https://plus.unsplash.com","images.unsplash.com", "cdn.pixabay.com", "images.pexel.com", "online.stanford.edu", "www.investopedia.com", "online.stanford.edu/sites/default/files/inline-images", "images.pexels.com"],
    },

        
};

export default nextConfig