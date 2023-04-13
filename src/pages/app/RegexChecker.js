import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const RegexChecker = ({ initialRegex = /(?:)/ }) => {
  const [input, setInput] = useState("");
  const [matchResult, setMatchResult] = useState([]);
  const [regex, setRegex] = useState(initialRegex);

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    const newMatchResult = getMatchResult(value, regex);
    setMatchResult(newMatchResult);
  };

  const handleRegexChange = (e) => {
    const { value } = e.target;
    try {
      const newRegex = new RegExp(value, "g");
      setRegex(newRegex);
      const newMatchResult = getMatchResult(input, newRegex);
      setMatchResult(newMatchResult);
    } catch (err) {
      console.log(err);
    }
  };

  const getMatchResult = (text, regex) => {
    const matchResult = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchedText = match[0];
      const index = match.index;

      if (matchedText.length === 0) {
        regex.lastIndex += 1;
        if (regex.lastIndex > text.length) {
          break;
        }
      }

      if (index > lastIndex) {
        matchResult.push({
          text: text.substring(lastIndex, index),
          isMatch: false,
        });
      }
      matchResult.push({ text: matchedText, isMatch: true });
      lastIndex = index + matchedText.length;
    }

    if (lastIndex < text.length) {
      matchResult.push({
        text: text.substring(lastIndex),
        isMatch: false,
      });
    }

    return matchResult;
  };

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
        multiline
        rows={4}
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
    </div>
  );
};

RegexChecker.propTypes = {
  initialRegex: PropTypes.instanceOf(RegExp),
};

export default RegexChecker;
