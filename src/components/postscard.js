import React from "react"
import { styled } from "@mui/material/styles"
import PropTypes from "prop-types"
import { Box, Card, Grid, Typography, CardActionArea } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import Hidden from "@mui/material/Hidden"
import {CalendarToday, Update} from '@mui/icons-material';
import twemoji from '@twemoji/api'
import tagStyles from './tagStyles.json';

const PREFIX = "postscard"

const classes = {
  card: `${PREFIX}-card`,
  cardDetails: `${PREFIX}-cardDetails`,
  cardMedia: `${PREFIX}-cardMedia`,
}

const StyledGrid = styled(Grid)({
  [`& .${classes.card}`]: {
    display: "flex",
  },
  [`& .${classes.cardDetails}`]: {
    flex: 1,
  },
  [`& .${classes.cardMedia}`]: {
    width: 0,
  },
})

export default function Postcard(props) {
  const { post } = props
  const tag = post.frontmatter.tags[0];
  const tagStyle = tagStyles[tag] || tagStyles["default"];
  return (
    <StyledGrid item xs={12} md={12} marginBottom={2}>
      <CardActionArea component="a" href={post.fields.slug}>
        <Card className={classes.card}>
          <Hidden xsDown>
            <Box>
              <Typography
                bgcolor= {tagStyle.bgcolor}
                width='120px'
                align="center"
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
                display={"flex"}
                variant="h2"
                dangerouslySetInnerHTML={{ __html: twemoji.parse(tagStyle.icon) }}
                >
              </Typography>
            </Box>
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="div" variant="h5">
                {post.frontmatter.title || post.fields.slug}
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
              <hr />
              <Typography variant="subtitle1" paragraph>
                {post.frontmatter.description || post.excerpt}
              </Typography>
              <Typography component="div" variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </StyledGrid>
  )
}

Postcard.propTypes = {
  post: PropTypes.object,
}
