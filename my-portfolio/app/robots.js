export default function robots() {
  return {
    rules: {
      userAgent: '*',     // '*' means ALL robots (Google, Bing, Yahoo)
      allow: '/',         // Allow them to visit everything
      disallow: '/private/', // (Optional) Block them from private folders
    },
    sitemap: 'https://www.yogendrabisht.dev/sitemap.xml',
  }
}