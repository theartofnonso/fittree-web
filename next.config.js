/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  connect-src 'self' https://cognito-idp.eu-west-2.amazonaws.com/ https://cognito-identity.eu-west-2.amazonaws.com  https://vcjfyfujgnafzidkrjmnsdwuai.appsync-api.eu-west-2.amazonaws.com/graphql https://fr46ydrsrra53jtay5oxtuxxq4.appsync-api.eu-west-2.amazonaws.com/graphql https://o1400007.ingest.sentry.io;
  img-src 'self' data: https://d2ez6lox3k9lt0.cloudfront.net https://d26u7w064jxl38.cloudfront.net;
  media-src 'self' https://d2ez6lox3k9lt0.cloudfront.net https://d26u7w064jxl38.cloudfront.net;
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;  
`

const securityHeaders = [
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin'
    },
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    }
]

module.exports = {
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
            },
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        })
        return config
    },

}
