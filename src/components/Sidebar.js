import React from "react"
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types"
import Grid from "@mui/material/Grid"
import Bio from "./bio"

const PREFIX = 'Sidebar';

const classes = {
  sidebarAboutBox: `${PREFIX}-sidebarAboutBox`,
  sidebarSection: `${PREFIX}-sidebarSection`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`& .${classes.sidebarAboutBox}`]: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },

  [`& .${classes.sidebarSection}`]: {
    marginTop: theme.spacing(3),
  }
}));

export default function Sidebar(props) {

  const { archives, description, social, title } = props

  return (
    <StyledGrid item xs={12} md={3}>
      <Bio />
    </StyledGrid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
}
