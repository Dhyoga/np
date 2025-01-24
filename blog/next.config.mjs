/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Mengatur Next.js untuk mengekspor aplikasi sebagai statis
  distDir: 'out',    // Menyimpan hasil build dalam folder 'out'
};

export default nextConfig;
