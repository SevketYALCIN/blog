import { Link } from 'gatsby'
import * as React from 'react'

export default class LinkMenu extends React.Component {
    render() {
        return (
            <div className="index-menu">
                { this.props.children }
            </div>
        )
    }
}