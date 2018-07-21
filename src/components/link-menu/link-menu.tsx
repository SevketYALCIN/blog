import * as React from 'react'
import './link-menu.scss'

export default class LinkMenu extends React.Component {
    render() {
        return (
            <ul className="index-menu" itemProp="breadcrumb">
                { this.props.children }
            </ul>
        )
    }
}