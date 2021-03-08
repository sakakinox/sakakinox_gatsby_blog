/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/Fax2lqiP_400x400.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
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

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> <br />
        
          {author?.summary || null}<br />
          <IconButton>
            <Link href={`https://twitter.com/${social?.twitter || ``}`}>
            <TwitterIcon />
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
        </p>
      )}
    </div>
  )
}

export default Bio
