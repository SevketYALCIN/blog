import { Link } from 'gatsby'
import * as React from 'react'
import TagsBlock from '../tags-block/tags-block'
import './article-block.scss'

export default class ArticleBlock extends React.Component<ArticleBlockProps> {
  render() {
    return (
      <article itemProp="blogPosts" itemScope={true} itemType="http://schema.org/BlogPosting" className="article">
        <h2>{this.props.title}</h2>
        <small>{this.props.date}</small>
        <p dangerouslySetInnerHTML={{ __html: this.props.excerpt }} />
        <Link to={this.props.slug} className="card-link special-link" title="Go to the article page" />
        <TagsBlock tags={this.props.tags} />
      </article>
    )
  }
}

interface ArticleBlockProps {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}
