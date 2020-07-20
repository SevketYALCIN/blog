module.exports = {
  siteMetadata: {
    title: 'Sevket Yalcin',
    author: 'Sevket Yalcin',
    description: 'Full Stack Web Developer looking for a job in Tokyo. I build stuff on my free time and sometimes blog about it here.',
    siteUrl: 'https://sevketyalcin.com',
    twitter: '@sev_yalcin',
    image: 'https://lh3.googleusercontent.com/NUDV52VqjIcOIFLdaP_pOfb2qfJ7TnaR8-ysRw-BX4Gs4LhLTsygGy0Vmb9mWIvFSsYSHj_BnIs',
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
        omitGoogleFont: true
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ],
}
