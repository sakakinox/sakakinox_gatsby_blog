import React from "react"
import { Link } from "gatsby"
import NavicationBar from "../components/nav"


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

    header = (
      <header>
       <NavicationBar title={title} />  
      </header>
    )


  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © sakakinox All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
