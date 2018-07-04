import { Link } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout/layout'
import LinkMenu from '../components/link-menu/link-menu'
import { BaseTemplateProps } from '../models/template'

export default class Index extends React.Component<BaseTemplateProps> {
    render() {
        return (
            <Layout location={this.props.location}>
                <LinkMenu>
                    <Link to="/blog/">
                        Blog
                    </Link>
                </LinkMenu>
            </Layout>
        )
    }
}