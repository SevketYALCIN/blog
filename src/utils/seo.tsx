import * as React from 'react'
import Helmet from 'react-helmet'

class SEO extends React.Component<SeoProps> {    
    render() {
      return (
      <Helmet>
        {/* General tags */}
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
        <meta name="image" content={this.props.image} />
        <link rel="canonical" href={this.props.url}/>
  
        {/* OpenGraph tags */}
        <meta property="og:url" content={this.props.url} />
        {this.props.isBlogpost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={this.props.title} />
        <meta property="og:description" content={this.props.description} />
        <meta property="og:image" content={this.props.image} />
        <meta property="og:site_name" content="Sevket Yalcin" />
  
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={this.props.twitter} />
        <meta name="twitter:title" content={this.props.title} />
        <meta name="twitter:description" content={this.props.description} />
        <meta name="twitter:image" content={this.props.image} />
        <meta name="twitter:site" content={this.props.twitter} />
      </Helmet>
    )
  }
}

interface SeoProps {
    title: string
    description: string
    image: string
    url: string
    isBlogpost: boolean
    twitter: string
}

export default SEO