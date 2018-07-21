import * as React from 'react'

export default class BlogpostHeader extends React.Component<BlogpostHeaderProps> {
  render(){
    return (
      <p className="blogpost-header">
        <span itemProp="datePublished">{this.props.date}</span>
        <span>・</span>
        <span itemProp="timeRequired">{`${this.props.readTime} min `}</span>
        <span>read</span>
      </p>
    )
  }
}

interface BlogpostHeaderProps {
  date: string,
  readTime: string
}