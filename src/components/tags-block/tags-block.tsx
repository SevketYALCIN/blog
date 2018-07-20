import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import './tags-block.scss'

export default class TagsBlock extends React.Component<TagsBlockProps> {
    render() {
        return (
            <div className='tags'>
                <span>Tagged with </span>
                { this.props.tags.map((tag, index) => {
                        return (<span key={tag}>
                            <Link to={`/blog/tags/${kebabCase(tag)}`} className='tag' title={`Go to ${tag} tag page`}> 
                                {`${tag}`}
                            </Link>
                            {this.props.tags[index+1] ? ', ' : ''}
                        </span>
                        )
                    })
                }
            </div>
        )
    }
}

interface TagsBlockProps {
    tags: string[]
}