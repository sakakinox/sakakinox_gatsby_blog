import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { Link } from "gatsby"
import { theme } from '../styles/theme';
import Header from './Header';
import Footer from './Footer';

//import NavicationBar from "../components/nav"

const sections = [
  //{ title: 'Technology', url: '#' },
  //{ title: 'Design', url: '#' },
];

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

    header = (
      <header>
        <Header title={title} sections={sections}/>
      </header>
    )


  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
