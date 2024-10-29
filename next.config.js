/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Add a rule to handle the undici module
    config.module.rules.push({
      test: /node_modules\/undici\/lib\/.*\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    });

    return config;
  },
};

module.exports = nextConfig;