import React from "react"
import "./bio.scss"
import * as ProfilePic from "./profile-pic.jpg"

class Bio extends React.Component {
  render() {
    return (
      <div className="bio">
        <img
          src={ProfilePic}
          alt={`Sevket Yalcin`}
        />
        <p>
          Full Stack Web Developer who lives and works in Tokyo. <br/>
          I build stuff on my free time and blog about it here. <br/>
          I also often improve this blog, you can find the code on my <a target="blank" href="https://github.com/SevketYALCIN/blog" title="Go to this blog's Github repo">Github</a>. Don't hesitate to give me a feedback!
        </p>
      </div>
    )
  }
}

export default Bio
