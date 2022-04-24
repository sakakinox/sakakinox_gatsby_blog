import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { CssBaseline, Grid, Typography } from "@mui/material"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Postcard from "../components/postscard"

const Tags = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout location={location} title={siteTitle}>
      <SEO
          title={tagHeader}
        />
        <div>
          <h1>{tagHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const { title } = node.frontmatter
              return (
                <Postcard post={node} />
              )
            })}
          </ul>
          {/*
                  This links to a page that does not yet exist.
                  You'll come back to it!
                */}
          <Link to="/tags">All tags</Link>
        </div>
      </Layout>
    </React.Fragment>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
    site{
      siteMetadata{
        title
      }
    }
  }
`