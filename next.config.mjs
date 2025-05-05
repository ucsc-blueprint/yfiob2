const nextConfig = {
    output: "export", // Outputs a Single-Page Application (SPA).
    distDir: "./build", // Changes the build output directory to `./build`.
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
