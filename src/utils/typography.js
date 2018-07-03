import Typography from 'typography'
import githubTheme from 'typography-theme-github'

githubTheme.overrideThemeStyles = () => ({
  'body': {
    background: "#fbfafc"
  },
  'a, strong': {
    color: "#fb1d1d"
  },
  'ul': {
    display: "flex",
    justifyContent: "space-between",
    listStyle: "none",
    marginLeft: 0
  }
})

const typography = new Typography(githubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
