const nextConfig = {
    // Remove static export for Firebase App Hosting compatibility
    // output: "export", // This was causing the routes-manifest.json issue
    
    // Use default distDir for Firebase App Hosting
    // distDir: "./build", // Firebase App Hosting expects .next directory
    
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    
    // Ensure proper trailing slash handling
    trailingSlash: false,
};

export default nextConfig;
