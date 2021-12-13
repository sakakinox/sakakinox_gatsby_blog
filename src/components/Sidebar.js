import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
import Bio from "./bio"
import Scroll from "../components/Scroll"

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}))

export default function Sidebar(props) {
  const classes = useStyles()
  const { archives, description, social, title } = props

  return (
    <Grid item xs={12} md={3}>
      <Bio />
    </Grid>
  )
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
}
