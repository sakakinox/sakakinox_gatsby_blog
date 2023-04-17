import React, { useState, useEffect } from "react"
import { TextField, Button, Typography, Grid, CssBaseline } from "@mui/material"

function Roulette({ title }) {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [inputItems, setInputItems] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    const storedItems = localStorage.getItem("rouletteItems")
    if (storedItems) {
      setItems(storedItems.split(","))
      setInputItems(storedItems.split(",").join("\n"))
    }
  }, [])

  const saveItemsToCookie = () => {
    const now = new Date()
    now.setMonth(now.getMonth() + 1)
    localStorage.setItem("rouletteItems", items.join(","), {
      expires: now.toUTCString(),
    })
  }

  const handleSpin = () => {
    if (items.length > 0) {
      setIsSpinning(true)
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * items.length)
        setSelectedItem(items[randomIndex])
      }, 50)
      setTimeout(() => {
        clearInterval(intervalId)
        const randomIndex = Math.floor(Math.random() * items.length)
        setSelectedItem(items[randomIndex])
        setIsSpinning(false)
      }, 2000)
    }
    saveItemsToCookie()
  }

  const handleShuffle = () => {
    setItems(prevItems => prevItems.sort(() => Math.random() - 0.5))
    setSelectedItem(null)
    setInputItems(items.join("\n"))
    saveItemsToCookie()
  }

  const handleInputChange = event => {
    setInputItems(event.target.value)
    setItems(event.target.value.split("\n").map(item => item.trim()))
    setSelectedItem(null)
  }

  return (
    <>
      <Typography variant="h4">Roulette App</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Button variant="contained" onClick={handleShuffle}>
            Shuffle
          </Button>
          <br />
          <br />
          <div style={{ display: "inline-block" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSpin}
              disabled={items.length === 0 || isSpinning}
            >
              Spin
            </Button>
          </div>
          <br />
          <br />
          <TextField
            label="Input items (separate by line)"
            multiline
            minRows={10}
            maxRows={50}
            value={inputItems}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {selectedItem === null && (
            <Typography variant="h4">
              Please input some items to spin!
            </Typography>
          )}
          {selectedItem && (
            <Typography
              variant="h4"
              style={{ color: isSpinning ? "black" : "red" }}
            >
              {selectedItem}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Roulette
