import React from 'react';
import { graphql } from "gatsby"
import { CssBaseline, Grid, Typography, Chip, Stack, Box } from "@mui/material"
import {CalendarToday, Update} from '@mui/icons-material';
import Layout from "../components/layout"
import Seo from "../components/Seo"
import Postcard from "../components/postscard"
import Comments from '../components/Comments'
import _ from "lodash"
import twemoji from '@twemoji/api'
import tagStyles from '../components/tagStyles.json';

const BlogPostTemplate = ({ data, location, children }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const tag = post.frontmatter.tags[0];
  const tagStyle = tagStyles[tag] || tagStyles["default"];

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout location={location} title={siteTitle}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          ogtype='article'
        />
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
          <Box>
              <Typography
                bgcolor= {tagStyle.bgcolor}
                width={"100%"}
                align="center"
                alignItems={"center"}
                justifyContent={"center"}
                height="250px"
                display={"flex"}
                variant="h2"
                marginBottom={"5%"}
                dangerouslySetInnerHTML={{ __html: twemoji.parse(tagStyle.icon) }}
                >
              </Typography>
            </Box>
            <Typography variant="h5" component="div" itemProp="headline">
              {post.frontmatter.title}
            </Typography>
            <Typography variant="subtitle1" component="div" color="textSecondary" display="flex" alignItems="center" gap={1} >
              <Box component="span" display="flex" alignItems="center">
                <CalendarToday fontSize="inherit" />
                <Box component="span" ml={0.5}>
                  {post.frontmatter.date}
                </Box>
              </Box>
              <Box component="span" display="flex" alignItems="center">
                <Update fontSize="small" />
                <Box component="span" ml={0.5}>
                  {post.fields.gitAuthorTime}
                </Box>
              </Box>
            </Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              {post.frontmatter.tags?.map(tag => {
                return (
                  <Chip
                    label={`#` + tag}
                    component="a"
                    href={`/tags/${_.kebabCase(tag)}/`}
                    style={{ textDecoration: "none" }}
                    clickable
                  />
                )
              })}
            </Stack>
          </header>

          <hr />
          <section itemProp="articleBody">{children}</section>
          <hr />
          <Comments />
          <hr />
          <footer></footer>
        </article>
        <Grid container spacing={0}>
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
        author {
          name
          summary
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        published
        tags
      }
      fields {
        slug
        gitAuthorTime(formatString: "MMMM DD, YYYY")
        modifiedHtml
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
        gitAuthorTime(formatString: "MMMM DD, YYYY")
      }
      excerpt(pruneLength: 160)
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
        gitAuthorTime(formatString: "MMMM DD, YYYY")
      }
      excerpt(pruneLength: 160)
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`