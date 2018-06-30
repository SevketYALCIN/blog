export interface TemplateProps<T> extends BaseTemplateProps {
    data: T
}

export interface BaseTemplateProps {
    location: {
        pathname: string
    },
    pageContext?: any
}