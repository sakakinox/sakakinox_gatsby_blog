import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const OGPLink = ({ url }) => {
  const data = useStaticQuery(graphql`
  query {
    allDataJson {
      edges {
        node {
          OgpLinks {
            URL
            ogp {
              og_title
              og_site_name
              og_image
              og_description
            }
          }
        }
      }
    }
  }
  `);

  const ogpInfo = data.allDataJson.edges
                  .flatMap(edge => edge.node.OgpLinks || [])
                  .find(link => link.URL === url || {});

  if (!ogpInfo || !ogpInfo.ogp || !ogpInfo.ogp.og_title) {
    return (
      <Card sx={{ maxWidth: 700, my: 2, marginLeft: 4}}>
        <CardActionArea href={url} target="_blank" rel="noopener noreferrer">
          <CardContent>
            <Typography variant="body2">
              {url}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

return (
  <Card sx={{ display: 'flex', maxWidth: 700, my: 2, marginLeft: 4 }}>
    <CardActionArea href={url} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', justifyContent: 'start', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, p: 2 }}>
        <Typography gutterBottom variant="subtitle1" component="div">
          {ogpInfo.ogp.og_title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            marginBottom: '4px',
          }}
        >
          {ogpInfo.ogp.og_description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LinkIcon sx={{ marginRight: '5px' }} />
          <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis',  }}>
            {url}
          </Typography>
        </Box>
      </Box>
      {ogpInfo.ogp.og_image && (
        <CardMedia
          component="img"
          sx={{ width: 151, objectFit: 'cover' }}
          image={ogpInfo.ogp.og_image}
          alt={ogpInfo.ogp.og_title || 'OGP Image'}
        />
      )}
    </CardActionArea>
  </Card>
);
}

export default OGPLink;
