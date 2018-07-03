import { Link } from "gatsby"
import * as React from "react"
import './article-block.scss'

export default class ArticleBlock extends React.Component<ArticleBlockProps> {
    render(){
        return (
            <div className="article">
              <h3>
                {this.props.title}
              </h3>
              <small>{this.props.date}</small>
              <p dangerouslySetInnerHTML={{ __html: this.props.excerpt }} />
              <Link to={this.props.slug} />
            </div>
          )
    }
}

interface ArticleBlockProps  {
    slug: string
    title: string
    date: string
    excerpt: string
}