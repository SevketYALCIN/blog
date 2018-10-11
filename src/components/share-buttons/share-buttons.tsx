import * as React from 'react'
import './share-buttons.scss'

export default class ShareButtons extends React.Component<ShareButtonsProps> {
  render(){
    return(
      <div className="share-buttons">
        <iframe 
          title={`Share ${this.props.title} on Twitter`}
          id="tweet-button"
          frameBorder="0"
          scrolling="no"
          width="73"
          height="20"
          src="https://platform.twitter.com/widgets/tweet_button.html?via=sev_yalcin"
          style={{border:"none",overflow:"hidden"}}/>
      </div>
    )
  }
}

interface ShareButtonsProps{
  title: string,
  url: string
}