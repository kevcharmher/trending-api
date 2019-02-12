const request = require('request');
const cheerio = require('cheerio');

const express = require('express');
var app = express();

const port = process.env.PORT || 3000;

var array = [];
var array2 = ['Kevin', 'Bear', 'CP3'];

app.get('/', (req, res) => {
  res.json(array2);
});

app.get('/api/trending', (req, res) => {
  array = [];
  request('https://trends24.in/united-states/', (error, response, html) => {
    if (!error & (response.statusCode == 200)) {
      const $ = cheerio.load(html);

      const xy = $('.trend-card__list li')
        .slice(0, 10)
        .each((i, el) => {
          let text = $(el).text();
          array.push(text);
        });
      console.log(array);
      res.json(array);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
