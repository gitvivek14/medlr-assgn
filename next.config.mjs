/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/jpg'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.com',
              port: '',
            },
          ],
      },
};

export default nextConfig;
