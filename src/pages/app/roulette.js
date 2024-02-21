// RoulettePage.js
import React from "react"
import { graphql } from "gatsby"
import Roulette from "../../components/Roulette"
import Layout from "../../components/layout"
import Seo from "../../components/Seo"
import Comments from "../../components/Comments"

function RoulettePage({ data }) {
  const { title } = data.site.siteMetadata

  return (
    <Layout location={"/app/roulette"} title={title}>
      <Seo title="Roulette App" />
      <Roulette title={title} />
      <hr />
      <Comments />
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
