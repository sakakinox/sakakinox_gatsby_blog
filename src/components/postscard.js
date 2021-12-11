import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Hidden from "@mui/material/Hidden"

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
})

export default function Postcard(props) {
  const classes = useStyles()
  const { post } = props

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href={post.fields.slug}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="div" variant="h5">
                {post.frontmatter.title || post.fields.slug}
              </Typography>
              <Typography component="div" variant="subtitle1" color="textSecondary">
                {post.frontmatter.date}
              </Typography>
              <hr />
              <Typography variant="subtitle1" paragraph>
                {post.frontmatter.description || post.excerpt}
              </Typography>
              <Typography component="div" variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={post.image}
              title={post.imageTitle}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

Postcard.propTypes = {
  post: PropTypes.object,
}
