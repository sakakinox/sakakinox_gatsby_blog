import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import RegexChecker from "../../components/RegexChecker"
import SEO from "../../components/Seo"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

const RegexPage = ({ data }) => {
  const { title } = data.site.siteMetadata
  return (
    <Layout location={"/app/regex"} title={title}>
      <SEO title="Regex Checker" />
      <RegexChecker />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="5%">#</TableCell>
            <TableCell width="12%">表現方法</TableCell>
            <TableCell>説明</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>.</TableCell>
            <TableCell>任意の1文字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>\d</TableCell>
            <TableCell>任意の数字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>\D</TableCell>
            <TableCell>数字以外の任意の文字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>\w</TableCell>
            <TableCell>任意の英数字またはアンダースコアを表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5</TableCell>
            <TableCell>\W</TableCell>
            <TableCell>
              英数字またはアンダースコア以外の任意の文字を表します。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>6</TableCell>
            <TableCell>\s</TableCell>
            <TableCell>任意の空白文字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>\S</TableCell>
            <TableCell>空白文字以外の任意の文字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>8</TableCell>
            <TableCell>[abc]</TableCell>
            <TableCell>
              'a'、'b'、または'c'のいずれかの文字を表します。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>9</TableCell>
            <TableCell>[^abc]</TableCell>
            <TableCell>'a'、'b'、'c'以外の任意の文字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>10</TableCell>
            <TableCell>[a-z]</TableCell>
            <TableCell>'a'から'z'までの任意の小文字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>11</TableCell>
            <TableCell>[A-Z]</TableCell>
            <TableCell>'A'から'Z'までの任意の大文字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>12</TableCell>
            <TableCell>[0-9]</TableCell>
            <TableCell>任意の数字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>13</TableCell>
            <TableCell>[0-9]</TableCell>
            <TableCell>任意の数字を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>14</TableCell>
            <TableCell>{"^"}</TableCell>
            <TableCell>文字列の先頭を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>15</TableCell>
            <TableCell>$</TableCell>
            <TableCell>文字列の末尾を表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>16</TableCell>
            <TableCell>*</TableCell>
            <TableCell>
              直前の要素が0回以上繰り返されることを表します。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>17</TableCell>
            <TableCell>+</TableCell>
            <TableCell>
              直前の要素が1回以上繰り返されることを表します。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>18</TableCell>
            <TableCell>?</TableCell>
            <TableCell>
              直前の要素が0回または1回出現することを表します。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>19</TableCell>
            <TableCell>|</TableCell>
            <TableCell>
              OR条件（選択）を表します。左右の表現のうち、どちらかを満たす場合にマッチします。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>20</TableCell>
            <TableCell>\b</TableCell>
            <TableCell>単語の境界にマッチします。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>21</TableCell>
            <TableCell>\B</TableCell>
            <TableCell>単語の境界以外にマッチします。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>22</TableCell>
            <TableCell>(abc)</TableCell>
            <TableCell>
              キャプチャグループを作成し、グループ内の文字列にマッチします。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>23</TableCell>
            <TableCell>{"{n}"}</TableCell>
            <TableCell>直前の要素がn回繰り返されることを表します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>24</TableCell>
            <TableCell>{"{n,}"}</TableCell>
            <TableCell>
              直前の要素がn回以上繰り返す場合にマッチします。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>25</TableCell>
            <TableCell>{"{n,m}"}</TableCell>
            <TableCell>
              直前の要素がn回以上、m回以下繰り返す場合にマッチします。
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Layout>
  )
}

export default RegexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
