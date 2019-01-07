import { Link, graphql } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout/layout'
import LinkMenu from '../components/link-menu/link-menu'
import SEO from '../utils/seo'

export default class Index extends React.Component {
  render() {
    const indexSeo = {
      title: `${this.props.data.site.siteMetadata.title}`,
      description: this.props.data.site.siteMetadata.description,
      image: this.props.data.site.siteMetadata.image,
      url: `${this.props.data.site.siteMetadata.siteUrl}`,
      isBlogpost: false,
      twitter: this.props.data.site.siteMetadata.twitter,
    }
    return (
      <Layout location={this.props.location}>
        <SEO {...indexSeo} />
        <LinkMenu>
          <div className="link-block">
            <div className="link-block-title">
              WORK
            </div>
            <div className="link-block-content">
              <a href="https://www.infinitesquare.com/" title="Infinite Square's website" target="blank">Infinite Square, Paris</a>
              <div>
                Software engineer
              </div>
            </div>
            <div className="link-block-title">
              Previously
            </div>
            <div className="link-block-content">
              <a href="https://www.forcia.com/" title="Forcia's website" target="blank">Forcia, Tokyo</a>
              <div>
                Software engineer
              </div>
            </div>
          </div>
          <div className="link-block">
            <div className="link-block-title">
              BLOG
            </div>
            <div className="link-block-content">
              {this.props.data.allMarkdownRemark.edges.map(({ node }, index) => {
                return <div key={`link-${index}`} className="blog-links"><Link to={node.fields.slug} title={node.frontmatter.title}>{node.frontmatter.title}</Link></div>
              })}
              <div className="go-to-list"><Link className="see-more" to={'/blog/'} title={'See more'}>See more</Link></div>
            </div>
          </div>
          <div className="link-block">
            <div className="link-block-title">
              About me
            </div>
            <div className="link-block-content">
              <Link to={'/weightlifting/'} title={'Go to Weight Lifting page'}>Weight Lifting</Link>
            </div>
          </div>
        </LinkMenu>
      </Layout>
    )
  }
}

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
            tags
          }
        }
      }
    }
  }
`
