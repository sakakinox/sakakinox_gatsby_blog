import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function Postcard(props) {
  const classes = useStyles();
  const { post } = props;
  const { title } = props;
  const { date } = props;
  const { description } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={ post.fields.slug }>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.frontmatter.title || post.fields.slug}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.frontmatter.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.frontmatter.description || post.excerpt}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Postcard.propTypes = {
  post: PropTypes.object,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string
};