import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { Container, Grid } from "@mui/material"
import Scroll from "./Scroll"

//import NavicationBar from "../components/nav"

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
  )
}

export default Layout
