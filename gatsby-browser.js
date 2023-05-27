// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
// custom CSS styles
// Highlighting for code blocks
import "prismjs/themes/prism.css"
import "./styles/style.css"
import React from 'react';
import { MDXProvider } from '@mdx-js/react'
import OgpLink from './src/components/OgpLink'

const components = {
  OgpLink,
  // any other components you want as shortcodes
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)