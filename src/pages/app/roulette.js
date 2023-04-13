import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { TextField, Button, Typography } from '@mui/material';
import Layout from '../../components/layout';

function Roulette() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputItems, setInputItems] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  // 保存したitemsがある場合は読み込む
  useEffect(() => {
    const savedItems = localStorage.getItem('rouletteItems');
    if (savedItems) {
      setItems(savedItems.split(','));
      setInputItems(savedItems);
    }
  }, []);

  const handleSpin = () => {
    if (items.length > 0) {
      setIsSpinning(true);
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * items.length);
        setSelectedItem(items[randomIndex]);
      }, 50);
      setTimeout(() => {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * items.length);
        setSelectedItem(items[randomIndex]);
        setIsSpinning(false);
      }, 2000);
    }
  };

  const handleShuffle = () => {
    setItems((prevItems) => prevItems.sort(() => Math.random() - 0.5));
    setSelectedItem(null);
    setInputItems(items.join('\n'));
    // itemsをクッキーに保存
    localStorage.setItem('rouletteItems', items.join(','));
  };

  const handleInputChange = (event) => {
    setInputItems(event.target.value);
    setItems(event.target.value.split('\n'));
    setSelectedItem(null);
  };

  return (
    <Layout location={'/app/roulette'} title="sakakinox.net">
      <Typography variant="h4">Roulette App</Typography>
      {selectedItem === null && <Typography>Please input some items to spin!</Typography>}
      {selectedItem && (
        <Typography variant="h4" style={{ color: isSpinning ? 'black' : 'red' }}>
          {selectedItem}
        </Typography>
      )}
      <br />
      <Button variant="contained" onClick={handleShuffle}>
        Shuffle
      </Button>
      <br />
      <br />
      <div style={{ display: 'inline-block' }}>
        <Button variant="contained" color="primary" onClick={handleSpin} disabled={items.length === 0 || isSpinning}>
          Spin
        </Button>
      </div>
      <br />
      <br />
      <TextField
        label="Input items (separate by line)"
        multiline
        minRows={15}
        maxRows={50}
        value={inputItems}
        onChange={handleInputChange}
      />
    </Layout>
  );
}

export default Roulette;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
