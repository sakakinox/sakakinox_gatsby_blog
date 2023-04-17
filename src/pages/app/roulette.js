// RoulettePage.js
import React from "react"
import { graphql } from "gatsby"
import Roulette from "../../components/Roulette"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

function RoulettePage({ data }) {
  const { title } = data.site.siteMetadata

  return (
    <Layout location={"/app/roulette"} title={title}>
      <SEO title="Roulette App" />
      <Roulette title={title} />
    </Layout>
  )
}

export default RoulettePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
