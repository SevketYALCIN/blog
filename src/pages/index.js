import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/layout'
// import { TemplateProps } from '../models/template';
import SEO from '../utils/seo'

class BlogIndex extends React.Component {
  // class BlogIndex extends React.Component<TemplateProps<Index>> {
  indexSeo = {
    title: this.props.data.site.siteMetadata.title,
    description: this.props.data.site.siteMetadata.description,
    image: this.props.data.site.siteMetadata.image,
    url: this.props.data.site.siteMetadata.siteUrl,
    isBlogpost: false,
    twitter: this.props.data.site.siteMetadata.twitter
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <SEO {...this.indexSeo} />
        <Bio />
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
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
        description
        image
        siteUrl
        twitter
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