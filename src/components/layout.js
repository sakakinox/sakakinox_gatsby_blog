import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { Container, Grid } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Scroll from "./Scroll"

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffa4a2",
      main: "#e57373",
      dark: "#af4448",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#e35083",
      main: "#ad1357",
      dark: "#78002e4",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: ["Noto Sans JP", "sans"].join(","),
    fontSize: 15,
    h1: {
      fontSize: "2rem",
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h1",
        h2: "h2",
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
        subtitle1: "h2",
        subtitle2: "h2",
        body1: "span",
        body2: "span",
      },
    },
  },
})

const sections = [
  //{ title: 'Technology', url: '#' },
  //{ title: 'Design', url: '#' },
]

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  header = (
    <header>
      <Header title={title} sections={sections} />
    </header>
  )

  return (
    <ThemeProvider theme={theme}>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">{header}</header>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <main>{children}</main>
            </Grid>
            <Sidebar />
          </Grid>
        </Container>
        <Scroll showBelow={250} />
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
