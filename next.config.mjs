/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['placehold.co', 'nextjs.org'], // Разрешаем домен placehold.co
        dangerouslyAllowSVG: true,  // Разрешаем загрузку SVG
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",  // Улучшение безопасности
    },
};

export default nextConfig;