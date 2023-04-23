import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const StyledCard = styled(Card)`
  display: flex;
  margin-bottom: 16px;
  text-decoration: none;
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CardContentContainer = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

const OgpLink = ({ url }) => {
  const [ogpInfo, setOgpInfo] = useState(null);

  useEffect(() => {
    const fetchOgpInfo = async () => {
      try {
        const response = await fetch("/api/get-ogp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        setOgpInfo(data);
      } catch (error) {
        console.error("Failed to fetch OGP info:", error);
      }
    };

    fetchOgpInfo();
  }, [url]);

  if (!ogpInfo || !ogpInfo.success) {
    return <a href={url}>{url}</a>;
  }

  const { ogTitle, ogDescription, ogImage } = ogpInfo.data;

  return (
    <a href={url} style={{ textDecoration: "none" }}>
      <StyledCard>
        {ogImage && (
          <CardMedia
            component="img"
            alt={ogTitle}
            height="140"
            image={ogImage.url}
            sx={{ width: 151 }}
          />
        )}
        <CardContentContainer>
          <Typography gutterBottom variant="h5" component="div">
            {ogTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ogDescription}
          </Typography>
        </CardContentContainer>
      </StyledCard>
    </a>
  );
};

export default OgpLink;
