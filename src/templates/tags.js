import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import ArticleBlock from '../components/article-block/article-block'
import SEO from '../utils/seo'

export default class Tags extends React.Component {
  render() {
    const tag = this.props.pageContext.tag
    const { edges, totalCount } = this.props.data.allMarkdownRemark
    const seoTags = {
      title: `${tag} | Blog | ${this.props.data.site.siteMetadata.title}`,
      description: ``,
      image: this.props.data.site.siteMetadata.image,
      url: `${this.props.data.site.siteMetadata.siteUrl}/blog/tags/${tag}`,
      isBlogpost: false,
      twitter: this.props.data.site.siteMetadata.twitter
    }
    return (
        <Layout location={this.props.location}>
          <SEO { ...seoTags } />
          <h1>{`${tag} (${totalCount})`}</h1>
          {edges.map(({ node }) => {
            const { title, date, tags } = node.frontmatter;
            const { slug } = node.fields;
            const excerpt = node.excerpt;
            return (
              <ArticleBlock 
                date={date}
                title={title}
                slug={slug}
                excerpt={excerpt}
                key={slug}
                tags={tags}
              />
            );
          })}
        </Layout>
    )
  }
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        image
        siteUrl
        twitter
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields{
            slug
          }
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;