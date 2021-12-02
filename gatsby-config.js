module.exports = {
  siteMetadata: {
    author: "Katan Patel",
    title: "Radix Logical Moon",
    validatorAddress: "rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a",
  },
  pathPrefix: "/",
  plugins: [
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `source sans pro\:300,400,400i,700`,
          `IBMPlexMono\:400, 700`,
          `BioRhyme\:200, 300, 400`,
          `Space Mono\:700`,
          'material icons',
        ],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-favicons',
      options: {
        logo: './src/assets/images/favicon-32x32.png',
        appName: 'Radix Logical Moon',
        
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          yandex: false,
          windows: true
        }
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-code-buttons'],
        options: {
          toasterText: "Copied to clipboard",
          toasterDuration: 10000,
        },
      }
    },
    "gatsby-plugin-transition-link",
  ],
};
