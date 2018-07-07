import { Link } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { BaseTemplateProps } from "../../models/template"
import * as github from "./github.png"
import "./layout.scss"
import * as mail from "./mail.png"
import * as twitter from "./twitter.png"

class Template extends React.Component<BaseTemplateProps> {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let goTo
    let title
    switch(location.pathname){
      case rootPath:
        goTo = '/'
        break
      case rootPath + '/blog' || rootPath + '/blog/':
        goTo = '/'
        break
      default:
        goTo = '/blog/'
        break
    }

    if(location.pathname === rootPath) {
      title = (
      <h1>
        <Link to={goTo}>
          SEVKET YALCIN
        </Link>
      </h1>)
    }
    else {
      title = (
        <h3>
          <Link to={goTo}>
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
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          
          {/* Favicon stuff from realfavicongenerator.net */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Helmet>
        {header}
        {children}
      </div>
    )
  }
}

export default Template