const siteUrl = 'https://nextjs-redux-tuong.netlify.app'

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/users/*',
          '/login',
          '/register',
          '/posts/create',
          '/search',
        ],
      },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
  exclude: ['/users/*', '/login', '/register', '/posts/create', '/search'],
}
