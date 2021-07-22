module.exports = {
  siteMetadata: {
    title: 'Sevket Yalcin',
    author: 'Sevket Yalcin',
    description: `Welcome to my homepage and blog. I'm Sevket Yalcin, full stack web developer looking for a challenging job.`,
    siteUrl: 'https://sevketyalcin.com',
    twitter: '@sev_yalcin',
    image:
      'https://lh3.googleusercontent.com/pw/AM-JKLX9Ctg4mC9UPtU8jn8D6e-cDFwgjjfIaNpBhbM21_jJixaViyweZBY5ySdFzN6MXAojB1UGMoS4gvpo22AMQi647cmy6A9ZDKOODVb7s1eRb5cU-1SmAFpKZfdN46QN3LThj9RDNVllTrzja9XpvGlZ=w940-h1254-no',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-122340394-1`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`,
    },
  ],
}
