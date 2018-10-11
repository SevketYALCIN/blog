import Typography from 'typography'
import githubTheme from 'typography-theme-github'

githubTheme.overrideThemeStyles = () => ({
  body: {
    background: '#fbfafc',
  },
  '.layout :not(pre) > code[class*="language-"]': {
    padding: '3px .1em',
    borderRadius: '0',
  },

  '::selection': {
    background: '#ffb7b7' /* WebKit/Blink Browsers */,
  },
  '::-moz-selection': {
    background: '#ffb7b7' /* Gecko Browsers */,
  },
  'a:not(.special-link)': {
    borderBottom: '1px dotted #98333359',
    textDecoration: 'none',
    color: 'black',
    transition: 'color 0.5s ease',
  },
  'a:not(.special-link):hover': {
    color: '#d04444',
  },
})

const typography = new Typography(githubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
