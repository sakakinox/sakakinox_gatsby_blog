// RoulettePage.js
import React from "react";
import { graphql } from "gatsby";
import Roulette from "../../components/Roulette";
import Layout from "../../components/layout";

function RoulettePage({ data }) {
  const { title } = data.site.siteMetadata;

  return (
    <Layout location={"/app/roulette"} title={title}>
      <Roulette title={title} />
    </Layout>
  );
}

export default RoulettePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
