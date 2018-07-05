import React from 'react'
import { graphql } from 'gatsby'
import Bio from '../components/bio/bio'
import Layout from '../components/layout/layout'
// import { TemplateProps } from '../models/template';
import SEO from '../utils/seo'
import ArticleBlock from '../components/article-block/article-block'

class BlogIndex extends React.Component {
  // class BlogIndex extends React.Component<TemplateProps<Index>> {
  indexSeo = {
    title: `Blog | ${this.props.data.site.siteMetadata.title}`,
    description: this.props.data.site.siteMetadata.description,
    image: this.props.data.site.siteMetadata.image,
    url: `${this.props.data.site.siteMetadata.siteUrl}/blog/`,
    isBlogpost: false,
    twitter: this.props.data.site.siteMetadata.twitter
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <SEO {...this.indexSeo} />
        <Bio />
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          const articleProps = {
            title: node.frontmatter.title || node.fields.slug,
            slug: node.fields.slug,
            date: node.frontmatter.date,
            excerpt: node.excerpt
          }
          return <ArticleBlock {...articleProps} key={articleProps.slug}/>
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
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