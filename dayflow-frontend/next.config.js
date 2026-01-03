const nextConfig = {
  reactStrictMode: true,
  // Optimize webpack cache to prevent memory issues
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Reduce cache size in development
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    return config;
  },
  // Disable source maps in production to reduce memory usage
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
