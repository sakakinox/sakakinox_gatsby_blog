import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import HomeIcon from "@mui/icons-material/Home"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const { sections, title } = props

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <Link href="/">
            <HomeIcon />
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
    </React.Fragment>
  )
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
}
