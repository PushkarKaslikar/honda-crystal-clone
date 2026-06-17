const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
  const cars = ['elevate', 'city', 'amaze', 'zr-v'];
  for (const car of cars) {
    try {
      const res = await axios.get(`https://www.carwale.com/honda-cars/${car}/colours/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const $ = cheerio.load(res.data);
      const images = [];
      $('img').each((i, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src');
        if (src && src.includes('carwale') && src.includes('color')) {
          images.push(src);
        }
      });
      console.log(`Found ${car} Images:`, images.slice(0, 10));
    } catch(e) {
      console.log(`Error scraping ${car}:`, e.message);
    }
  }
}
scrape();
