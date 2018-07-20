import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../utils/seo'
import ArticleFooter from '../components/article-footer/article-footer'
import TagsBlock from '../components/tags-block/tags-block'
import * as Disqus from 'disqus-react';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMeta = this.props.data.site.siteMetadata
    const { previous, next } = this.props.pageContext

    const indexSeo = {
      title: `${post.frontmatter.title}`,
      description: post.excerpt,
      image: siteMeta.image,
      url: `${this.props.data.site.siteMetadata.siteUrl}${post.fields.slug}`,
      isBlogpost: true,
      twitter: siteMeta.twitter
    }

    const disqusShortname = `https-sevketyalcin-com`
    const disqusConfig = {
        url: indexSeo.url,
        identifier: post.fields.slug,
        title: post.frontmatter.title,
    };

    return (
      <Layout location={this.props.location}>
        <div itemscope itemtype="http://schema.org/BlogPosting">
          <SEO { ...indexSeo } />
          <h1 itemprop="headline">{post.frontmatter.title}</h1>
          <p>
            <span itemprop="datePublished">{post.frontmatter.date}</span>
            <span itemprop="keywords"><TagsBlock tags={post.frontmatter.tags}/></span>
          </p>
          <div itemprop="articleBody" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div itemprop="author">- Sevket Yalcin</div>
          <hr/>
          <div className="article">
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
          <ArticleFooter 
            next={next ? {slug: next.fields.slug, title: next.frontmatter.title} : null} 
            previous={previous ? {slug: previous.fields.slug, title: previous.frontmatter.title}: null} />
        </div>
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
        tags
      }
    }
  }
`