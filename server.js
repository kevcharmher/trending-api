const request = require('request');
const cheerio = require('cheerio');

const express = require('express');
var app = express();

var array = [];
var array2 = ['Kevin', 'Bear', 'CP3'];
// request('http://tweeplers.com/hashtags/?cc=US', (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//
//     const x = $('.col-xs-8.wordwrap').each((i, el) => {
//       var z = $(el).text();
//       console.log(z);
//     });
//   }
// });

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

app.listen(3000, () => {
  console.log('Now running on port 3000');
});
