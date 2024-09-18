import React, { useState } from 'react';
import style from './Hero3Styles.module.css';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import SpotifyPlayer from 'react-spotify-player';


const size = {
  width: '100%',
  height: 380,
};

const view = 'list'; 

function Hero3() {
  const [inputText, setInputText] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [condition,setCondition] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);

  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/analyze-text', {
        text: inputText,
      });
      setCondition(response.data.prediction);
      if (response.data.playlistUrl) {
        setPlaylistUrl(response.data.playlistUrl);
        setError('');
      } else {
        setPlaylistUrl('');
        setError('No playlist found');
      }
    } catch (error) {
      console.error('Error analyzing text:', error);
      setPlaylistUrl('');
      setError('Error analyzing text');
    }
  };

  return (
    <div className={style.heroContainer}>
      <div className={style.inputSection}>
        <h1>Share Your Feelings</h1>
        <textarea
          className={style.inputBox}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your feelings here..."
        />
        <button className={style.submitBtn} onClick={handleSubmit}>
          Analyze <FaArrowRight className={style.arrowIcon} />
        </button>
      </div>
      <div className={style.outputSection}>
        <h2>Detected Condition : {condition}</h2>
        <div className={style.outputBox}>
          {playlistUrl ? (
            <SpotifyPlayer
              uri={playlistUrl}
              size={size}
              view={view}
            />
          ) : error ? (
            <p>{error}</p>
          ) : (
            'Awaiting analysis...'
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero3;
