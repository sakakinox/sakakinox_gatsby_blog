import React, { useState } from "react"
import PropTypes from "prop-types"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

const RegexChecker = ({ regex = /(?:)/ }) => {
  const [input, setInput] = useState("")
  const [matchResult, setMatchResult] = useState([])
  const [matchResultText, setMatchResultText] = useState("")

  const handleChange = e => {
    const { value } = e.target
    setInput(value)
    const newMatchResult = getMatchResult(value, regex)
    setMatchResult(newMatchResult)
    const newMatchResultText = newMatchResult
      .map(match => (match.isMatch ? match.text : ""))
      .join("")
    setMatchResultText(newMatchResultText)
  }

  const handleRegexChange = e => {
    const { value } = e.target
    try {
      const newRegex = new RegExp(value)
      regex = newRegex
      const newMatchResult = getMatchResult(input, regex)
      setMatchResult(newMatchResult)
      const newMatchResultText = newMatchResult
        .map(match => (match.isMatch ? match.text : ""))
        .join("")
      setMatchResultText(newMatchResultText)
    } catch (err) {
      console.log(err)
    }
  }

  const getMatchResult = (text, regex) => {
    const matchResult = []
    let lastIndex = 0
    const matches = text.matchAll(regex)
    for (const match of matches) {
      const matchedText = match[0]
      const index = match.index
      if (index > lastIndex) {
        matchResult.push({
          text: text.substring(lastIndex, index),
          isMatch: false,
        })
      }
      matchResult.push({ text: matchedText, isMatch: true })
      lastIndex = index + matchedText.length
    }
    if (lastIndex < text.length) {
      matchResult.push({
        text: text.substring(lastIndex),
        isMatch: false,
      })
    }
    return matchResult
  }

  return (
    <div>
      <TextField
        label="正規表現"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={regex.source}
        onChange={handleRegexChange}
      />
      <TextField
        label="テスト文字列"
        variant="outlined"
        fullWidth
        margin="normal"
        value={input}
        onChange={handleChange}
      />
      <Typography variant="h6" component="div">
        {matchResult.map((match, index) => (
          <span key={index} style={{ color: match.isMatch ? "red" : "black" }}>
            {match.text}
          </span>
        ))}
      </Typography>
      <div>
        <Typography variant="h6" component="div" gutterBottom>
          マッチ結果
        </Typography>
        <textarea
          readOnly
          rows={4}
          value={matchResultText}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}

RegexChecker.propTypes = {
  regex: PropTypes.instanceOf(RegExp),
}

export default RegexChecker
