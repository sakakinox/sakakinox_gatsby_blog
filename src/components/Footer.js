import React from "react"
import { styled } from "@mui/material/styles"
import PropTypes from "prop-types"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

const PREFIX = "Footer"

const classes = {
  footer: `${PREFIX}-footer`,
}

const Root = styled("footer")(({ theme }) => ({
  [`&.${classes.footer}`]: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}))

function Copyright() {
  return (
    <Typography
      component="div"
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        sakakinox.net
      </Link>{" "}
      {"2021-"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default function Footer(props) {
  const { description, title } = props

  return (
    <Root className={classes.footer}>
      <Container maxWidth="lg">
        <Typography component="div" variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright title="" />
      </Container>
    </Root>
  )
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}
Copyright.prototype = {
  title: PropTypes.string,
}
