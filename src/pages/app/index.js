import * as React from "react"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import { Button, Typography } from "@mui/material"
import { graphql } from "gatsby"
import SEO from "../../components/seo"

const IndexPage = ({ data }) => {
  const { title } = data.site.siteMetadata

  return (
    <Layout location="/app" title={title}>
      <SEO title="App page" />
      <Typography variant="h4">App page</Typography>
      <Typography variant="body1">
        Click the button below to try out my app:
      </Typography>
      <Link to="/app/roulette">
        <Button variant="contained">Go to Roulette</Button>
      </Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
