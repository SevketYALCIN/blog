import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../utils/seo'
import ArticleFooter from '../components/article-footer/article-footer'
import * as Disqus from 'disqus-react';
import BlogpostHeader from '../components/blogpost-header/blogpost-header'
import TagsBlock from '../components/tags-block/tags-block'

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
        <div itemScope itemType="http://schema.org/BlogPosting">
          <SEO { ...indexSeo } />
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <BlogpostHeader 
            date={post.frontmatter.date}
            readTime={post.timeToRead}
            title={post.frontmatter.title}
            url={indexSeo.url}
            />
          <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div itemProp="author">- Sevket Yalcin</div>
          <TagsBlock tags={post.frontmatter.tags}/>
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
      timeToRead
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