// src/components/OGPLink.js
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const OGPLink = ({ url }) => {
  const data = useStaticQuery(graphql`
  query {
    allDataJson {
      edges {
        node {
          OgpLinks{
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
                  .flatMap(edge => edge.node.OgpLinks) // edges の配列から OgpLinks を抽出し、1つの配列に平坦化
                  .find(link => link.URL === url);
                  
  

  if (!ogpInfo || !ogpInfo.ogp.og_title) {
    return (
    <div>
      OGP情報が見つかりませんでした。, URL: {url}, ${__dirname}
    </div>
    );
  }
  
  return (
    <a href={url} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
        {ogpInfo.ogp.og_image && <img src={ogpInfo.ogp.og_image} alt={ogpInfo.ogp.og_title} style={{ width: '160px', height: '120px', marginRight: '10px', borderRadius: '5px' }} />}
        <div>
          <div style={{ fontWeight: 'bold' }}>{ogpInfo.ogp.og_title}</div>
          <div>{ogpInfo.ogp.og_description}</div>
        </div>
      </div>
    </a>
  );
};

export default OGPLink;
