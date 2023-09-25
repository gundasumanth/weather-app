const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config()

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Weather API endpoint
app.get('/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
