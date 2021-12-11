require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `sakakinox.net`,
    author: {
      name: `sakakinox`,
      summary: `Server enginier`,
    },
    description: ``,
    siteUrl: `https://sakakinox.net/`,
    social: {
      twitter: `sakakinox`,
      github: `sakakinox`,
      lastfm: `sakakinox`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-plugin-google-adsense`,
            options: {
            publisherId: `${process.env.GOOGLE_ADSENSE_ID}`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
              inlineCodeMarker: null,
              classPrefix: "language-",
              aliases: {},
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    //{
    //  resolve: `gatsby-plugin-google-analytics`,
    //  options: {
    //    trackingId: `${process.env.GOOGLE_ANALYTICS_ID}`,
    //    head: true,
    //  },
    //},
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [`${process.env.GOOGLE_ANALYTICS_ID}`],
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `sakakinox.net`,
        short_name: `sakakinox.net`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-sitemap`,
  ],
}
