/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import XIcon from "@mui/icons-material/X"
import GitHubIcon from "@mui/icons-material/GitHub"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import { Grid, IconButton } from "@mui/material"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/Fax2lqiP_400x400.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 50, height: 50, quality: 95, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
            lastfm
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.gatsbyImageData

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Grid item xs={12}>
        {avatar && (
          <GatsbyImage
            image={avatar}
            alt={author?.name || ``}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        )}
      </Grid>
      <Grid item>
        {author?.name && (
          <p>
            Written by <strong>{author.name}</strong> <br />
            {author?.summary || null}
          </p>
        )}
      </Grid>
      <Grid item>
        <IconButton>
          <Link href={`https://twitter.com/${social?.twitter || ``}`}>
            <XIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link href={`https://github.com/${social?.github || ``}`}>
            <GitHubIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link href={`https://last.fm/user/${social?.lastfm || ``}`}>
            <PlayCircleFilledIcon />
          </Link>
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Bio
