import React from "react"

import * as profilePic from "./profile-pic.jpg"

class Bio extends React.Component {
  render() {
    return (
      <div>
        <img
          src={profilePic}
          alt={`Sevket Yalcin`}
        />
        <p>
          Written by <strong>Kyle Mathews</strong> who lives and works in San
          Francisco building useful things.
          {/* Links to Github Twitter Email */}
        </p>
      </div>
    )
  }
}

export default Bio
