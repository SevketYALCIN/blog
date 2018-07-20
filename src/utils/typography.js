import Typography from 'typography'
import githubTheme from 'typography-theme-github'

githubTheme.overrideThemeStyles = () => ({
  'body': {
    background: "#fbfafc"
  },
  'a, strong': {
    color: "#fb1d1d"
  },
  '.layout :not(pre) > code[class*="language-"]': {
    padding: "3px .1em",
    borderRadius: "0"
  }
})

const typography = new Typography(githubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography