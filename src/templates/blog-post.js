import React from "react"
import { graphql } from "gatsby"
import { GlobalStyles, CssBaseline, Grid, Typography } from "@material-ui/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Postcard from "../components/postscard"
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

//const theme = createTheme({
//  components: {
//    MuiCssBaseline: {
//      styleOverrides: `
//        h1 {
//          color: grey;
//        }
//      `,
//    },
//  },
//});


const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout location={location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className="blogpost"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <Typography variant="h5"  itemProp="headline">{post.frontmatter.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary"> {post.frontmatter.date} </Typography>
          </header>
          <hr />
          <Typography  component="div" dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr />
          <footer></footer>
        </article>
        <Grid container spacing={2}>
          {previous && <Postcard post={previous} />}
          {next && <Postcard post={next} />}
        </Grid>
      </Layout>
    </React.Fragment>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        published
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
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
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
