import { Link } from "gatsby"
// tslint:disable-next-line:no-submodule-imports
import 'prismjs/themes/prism.css'
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
    let title
    switch (location.pathname) {
      case '/':
        title = (
          <h1>
            <span>
              I'm <span className="name">Sevket Yalcin</span>, a web developer currently looking for a job.
            </span>
          </h1>)
        break
      default:
        title = (
          <h3>
            <Link to='/' title="Go to Home" className="special-link">
              SEVKET YALCIN
            </Link>
          </h3>)
        break
    }

    const header = (
      <div className="header">
        {title}
        <div className="social-links">
          <a target="blank" href="https://github.com/SevketYALCIN" title="Go to my Github" className="special-link">
            <img src={github} alt='My Github' />
          </a>
          <a target="blank" href="https://twitter.com/sev_yalcin" title="Go to my Twitter" className="special-link">
            <img src={twitter} alt='My Twitter' />
          </a>
          <a href="mailto:sevket.yalcin@outlook.com" title="Send me an e-mail" className="special-link">
            <img src={mail} alt='My E-Mail' />
          </a>
        </div>
      </div>
    )

    return (
      <div className={location.pathname === '/' ? `layout main` : `layout`} itemScope={true} itemType="http://schema.org/WebPage">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          {/* Favicon stuff from realfavicongenerator.net */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="google-site-verification" content="0pdQzr72UjO22IoTTpMvgQWwyrms9LKpQuzu7pBdNS0" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        {header}
        {children}
      </div>
    )
  }
}

export default Template
