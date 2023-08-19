import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { CssBaseline, Typography } from "@mui/material"
import Layout from "../components/layout"
import Seo from "../components/Seo"
import Postcard from "../components/postscard"

const Tags = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${tag}:(${totalCount})`
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout location={location} title={siteTitle}>
        <Seo title={`#` + tag} />
        <header>
          <Typography variant="h5" component="div" itemProp="headline">
            {`#` + tagHeader}
          </Typography>
        </header>
        <hr />
        <ul>
          {edges.map(({ node }) => {
            return <Postcard post={node} />
          })}
        </ul>
        {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
        <Link to="/tags">All tags</Link>
      </Layout>
    </React.Fragment>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
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
  query ($tag: String) {
    allMdx(
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
          body
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
