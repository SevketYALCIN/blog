const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const squat = require('./data/squat.json')
const deadlift = require('./data/deadlift.json')
const overhead = require('./data/overhead.json')
const row = require('./data/row.json')
const bench = require('./data/bench.json')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('src/templates/tags.js')
    const weightliftingTemplate = path.resolve('src/templates/weightlifting/weightlifting.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        // Create tags pages.
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `/blog/tags/${_.kebabCase(tag)}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })

        // Create Weightlifting page
        createPage({
          path: `/weightlifting/`,
          component: weightliftingTemplate,
          context: {
            squat, deadlift, overhead, row, bench
          },
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}