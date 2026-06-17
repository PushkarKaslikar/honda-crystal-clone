const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
  try {
    const res = await axios.get('https://www.cardekho.com/carmodels/Honda/Honda_Elevate/colors', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(res.data);
    const script = $('#__NEXT_DATA__').html();
    if (script) {
      const data = JSON.parse(script);
      const str = JSON.stringify(data);
      const colors = ['orange', 'red', 'white', 'blue', 'brown', 'silver', 'grey', 'black'];
      for(const color of colors) {
          const regex = new RegExp(`https://[^\"]+${color}[^\"]+\\.jpg`, 'ig');
          const matches = str.match(regex);
          if (matches) {
              // try to find the one that says '360' or similar, or just first one
              console.log(`${color}: ${matches[0]}`);
          }
      }
    }
  } catch(e) {
    console.log("Error:", e.message);
  }
}
scrape();
