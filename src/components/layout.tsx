import { Link } from "gatsby"
import React from "react"
import { BaseTemplateProps } from "../models/template"
import * as github from "./github.png"
import "./layout.scss"
import * as mail from "./mail.png"
import * as twitter from "./twitter.png"

class Template extends React.Component<BaseTemplateProps> {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let title

    if(location.pathname === rootPath) {
      title = (
      <h1>
        <Link to={"/"}>
          SEVKET YALCIN
        </Link>
      </h1>)
    }
    else {
      title = (
        <h3>
          <Link to={"/"}>
            SEVKET YALCIN
          </Link>
        </h3>)
    }
    const header = (
      <div className="header">
        {title}
        <div>
          <a target="blank" href="https://github.com/SevketYALCIN">
            <img src={github} />
          </a>
          <a target="blank" href="https://twitter.com/sev_yalcin">
            <img src={twitter} />
          </a>
          <a href="mailto:sevket.yalcin@outlook.com">
            <img src={mail} />
          </a>
        </div>
      </div>
      )
    
    return (
      <div className="layout">
        {header}
        {children}
      </div>
    )
  }
}

export default Template