import React from "react"
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import HomeIcon from "@mui/icons-material/Home"
import AppsIcon from "@mui/icons-material/Apps"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

const PREFIX = 'Header';

const classes = {
  toolbar: `${PREFIX}-toolbar`,
  toolbarTitle: `${PREFIX}-toolbarTitle`,
  toolbarSecondary: `${PREFIX}-toolbarSecondary`,
  toolbarLink: `${PREFIX}-toolbarLink`,
  linkButton: `${PREFIX}-linkButton`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.toolbar}`]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  [`& .${classes.toolbarTitle}`]: {
    flex: 1,
  },

  [`& .${classes.toolbarSecondary}`]: {
    justifyContent: "space-between",
    overflowX: "auto",
  },

  [`& .${classes.toolbarLink}`]: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },

  [`& .${classes.linkButton}`]: {
    display: 'flex',
    alignItems: 'center',
  }
}));

export default function Header(props) {

  const { sections, title } = props

  return (
    <Root>
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <Link href="/">
            <HomeIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link href="/app">
          <AppsIcon />
          </Link>
        </IconButton>
        <Typography
          component="div"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {process.env.ENV_NAME}
          {title}
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Root>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
}
