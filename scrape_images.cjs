const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeCarDekho() {
  try {
    const res = await axios.get('https://www.cardekho.com/honda/elevate/colors', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    const html = res.data;
    
    // Extract all image URLs from the HTML
    const urls = html.match(/https:\/\/[^"]+\.(jpg|jpeg|png|webp)/g) || [];
    const uniqueUrls = [...new Set(urls)];
    
    // Filter for elevate color images
    const elevateColors = uniqueUrls.filter(u => u.includes('elevate') && u.includes('color'));
    console.log("Found Elevate Color URLs:", elevateColors);
    
  } catch(e) {
    console.log("Scrape error:", e.message);
  }
}

scrapeCarDekho();
