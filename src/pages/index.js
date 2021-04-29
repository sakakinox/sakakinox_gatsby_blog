import React from "react"
import { graphql } from "gatsby"
import { CssBaseline, Grid } from "@material-ui/core/"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Postcard from "../components/postscard"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

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
            <Grid container spacing={4}>
              <Postcard key={post.fields.slug} post={post} />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
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
