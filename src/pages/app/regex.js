import React from "react"
import Layout from "../../components/layout"
import RegexChecker from "../../components/RegexChecker"
import SEO from "../../components/seo"

const RegexPage = () => {
  return (
    <Layout location={"/app/regex"} title={"hoge"}>
      <SEO title="Regex Checker" />
      <RegexChecker />
    </Layout>
  )
}

export default RegexPage
