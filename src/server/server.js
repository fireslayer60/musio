import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { URLSearchParams } from 'url';

const app = express();
const PORT = 3000;

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(express.json());
app.use(cors());


async function getSpotifyAccessToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    console.log('Spotify Access Token:', tokenResponse.data.access_token);
    return tokenResponse.data.access_token;
}


async function searchSpotify(query, type = 'playlist') {
    const accessToken = await getSpotifyAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        params: {
            q: query,
            type: type,
            limit: 10, 
        },
    });

    console.log('Spotify Search Result:', response.data);
    return response.data;
}

function getRandomPlaylistUrl(playlists) {
    if (playlists.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const playlistUrl = playlists[randomIndex].external_urls.spotify;
    return playlistUrl;
}

app.post('/analyze-text', async (req, res) => {
    const { text } = req.body;

    try {
        console.log('Received text:', text);

        const response = await axios.post('http://127.0.0.1:8000/predict', { text });
        

        const disorder = response.data.prediction;
        
        
        const spotifyResult = await searchSpotify(disorder, 'playlist');

        const playlists = spotifyResult.playlists.items;
        

        
        const randomPlaylistUrl = getRandomPlaylistUrl(playlists);

        res.json({
            prediction: disorder,
            probabilities: response.data.probabilities,
            playlistUrl: randomPlaylistUrl 
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
