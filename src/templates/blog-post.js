import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import { rhythm } from '../utils/typography'
import SEO from '../utils/seo'
import ArticleFooter from '../components/article-footer/article-footer'
// import { TemplateProps } from '../models/template';

class BlogPostTemplate extends React.Component {
  // class BlogPostTemplate extends React.Component<TemplateProps<BlogPost>> {
  render() {
    const post = this.props.data.markdownRemark
    const siteMeta = this.props.data.site.siteMetadata
    const { previous, next } = this.props.pageContext

    const indexSeo = {
      title: `${post.frontmatter.title} | ${siteMeta.title}`,
      description: post.excerpt,
      image: siteMeta.image,
      url: `${this.props.data.site.siteMetadata.siteUrl}${post.fields.slug}`,
      isBlogpost: true,
      twitter: siteMeta.twitter
    }

    return (
      <Layout location={this.props.location}>
        <SEO { ...indexSeo } />
        <h1>{post.frontmatter.title}</h1>
        <p>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ArticleFooter 
          next={next ? {slug: next.fields.slug, title: next.frontmatter.title} : null} 
          previous={previous ? {slug: previous.fields.slug, title: previous.frontmatter.title}: null} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        title
        description
        image
        siteUrl
        twitter
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

// GraphQL node type
// type BlogPost = {
//   site:{
//     siteMetadata:{
//       title: string,
//       author: string
//     }
//   }
//   markdownRemark:{
//     id: string,
//     html: string,
//     frontmatter: {
//       title: string,
//       date: string
//     }
//   }
// }