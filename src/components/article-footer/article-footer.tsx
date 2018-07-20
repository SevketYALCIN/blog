import { Link } from 'gatsby'
import * as React from 'react'
import './article-footer.scss'

export default class ArticleFooter extends React.Component<ArticleFooterProps>  {
    render() {
        return (
        <ul className="article-footer">
            {this.props.previous && (
              <li className="previous">
                Previous<br />
                <Link to={this.props.previous.slug} rel="prev" title="Go to the previous article">
                  ← {this.props.previous.title}
                </Link>
              </li>
            )}
  
            {this.props.next && (
              <li className="next">
                Next<br />
                <Link to={this.props.next.slug} rel="next" title="Go to the next article">
                  {this.props.next.title} →
                </Link>
              </li>
            )}
        </ul>)
    }
}

interface ArticleFooterProps {
    previous: {
        slug: string;
        title: string
    },
    next: {
        slug: string;
        title: string
    }
}