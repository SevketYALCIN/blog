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
          <Link to="/blog/">Blog</Link>
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
  }
`
