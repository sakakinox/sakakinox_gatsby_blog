import React from "react"
import { graphql } from "gatsby"
import { CssBaseline, Grid } from "@mui/material"
import Layout from "../components/layout"
import SEO from "../components/Seo"
import Postcard from "../components/postscard"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes.filter(
    post => post.frontmatter.published !== false
  )

  if (posts.length === 0) {
    return (
      <React.Fragment>
        <CssBaseline />
        <Layout location={location} title={siteTitle}>
          <SEO title="All posts" />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
        </Layout>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <Grid container spacing={2}>
              <Postcard post={post} />
            </Grid>
          )
        })}
      </Layout>
    </React.Fragment>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          gitAuthorTime(formatString: "MMMM DD, YYYY")
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          published
        }
      }
    }
  }
`
