import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import { TemplateProps } from '../models/template';

class BlogIndex extends React.Component {
  // class BlogIndex extends React.Component<TemplateProps<Index>> {
  render() {
    // const siteTitle = get(this, 'props.data.site.siteMetadata.title') as string
    // const posts = get(this, 'props.data.allMarkdownRemark.edges') as Array<Post>

    return (
      <Layout location={this.props.location}>
        <Helmet title={this.props.data.site.siteMetadata.title} />
        <Bio />
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`

// GraphQL node type
// type Index = {
//   site:{
//     siteMetadata:{
//       title: string
//     }
//   }
//   allMarkdownRemark:{
//     edges:{
//       node:{
//         excerpt: string,
//         fields:{
//           slug: string
//         }
//         frontmatter: {
//           date: string,
//           title: string
//         }
//       }
//     }[]
//   }
// }