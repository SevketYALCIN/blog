import * as React from 'react'
import ShareButtons from '../share-buttons/share-buttons'

export default class BlogpostHeader extends React.Component<BlogpostHeaderProps> {
  render(){
    return (
      <div style={{marginBottom: "0"}}>
        <div style={{marginBottom: "5px"}}>
          <span itemProp="datePublished">{this.props.date}</span>
          <span>・</span>
          <span itemProp="timeRequired">{`${this.props.readTime} min `}</span>
          <span>read</span>
        </div>
        <ShareButtons 
              title={this.props.title}
              url={this.props.url}/>
      </div>
    )
  }
}

interface BlogpostHeaderProps {
  date: string,
  readTime: string,
  title: string,
  url: string
}