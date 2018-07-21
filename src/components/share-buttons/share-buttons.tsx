import * as React from 'react'
import './share-buttons.scss'

export default class ShareButtons extends React.Component<ShareButtonsProps> {
  render(){
    return(
      <div className="share-buttons">
        <iframe 
          id="share-button"
          title={`Share ${this.props.title} on Facebook`} 
          src={`https://www.facebook.com/plugins/share_button.php?href=${this.props.url}&layout=button&size=small&mobile_iframe=true&width=73&height=20&appId`}
          width="73"
          height="20"
          style={{border:"none",overflow:"hidden"}}
          scrolling="no"
          frameBorder="0"
          data-allow="encrypted-media"/>
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