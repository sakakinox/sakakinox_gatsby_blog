import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Layout from "../../components/layout";

const RegexChecker = ({ initialRegex = "" }) => {
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
      const newRegex = new RegExp(value, "gm");
      setRegex(newRegex);
      const newMatchResult = getMatchResult(input, newRegex);
      setMatchResult(newMatchResult);
    } catch (err) {
      console.log(err);
    }
  };

  const getMatchResult = (text, regex) => {
    const lines = text.split('\n');
    const matchResult = lines.map(line => {
      const lineMatchResult = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(line)) !== null) {
        const matchedText = match[0];
        const index = match.index;

        if (matchedText.length === 0) {
          regex.lastIndex += 1;
          if (regex.lastIndex > line.length) {
            break;
          }
        }

        if (index > lastIndex) {
          lineMatchResult.push({
            text: line.substring(lastIndex, index),
            isMatch: false,
          });
        }
        lineMatchResult.push({ text: matchedText, isMatch: true });
        lastIndex = index + matchedText.length;
      }

      if (lastIndex < line.length) {
        lineMatchResult.push({
          text: line.substring(lastIndex),
          isMatch: false,
        });
      }

      return lineMatchResult;
    });

    return matchResult;
  };

  return (
    <Layout location={"/app/regex"} title={"hoge"}>
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
        <pre>
          {matchResult.map((lineMatches, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {lineMatches.map((match, index) => (
                <span key={index} style={{ backgroundColor: match.isMatch ? "rgba(135,206,250, 0.3)" : "transparent" }}>
                  {match.text}
                </span>
              ))}
              {lineIndex < matchResult.length - 1 && <br />}
            </React.Fragment>
          ))}
        </pre>
      </Typography>
    </Layout>
  );
};

RegexChecker.propTypes = {
  initialRegex: PropTypes.string,
};

export default RegexChecker;
