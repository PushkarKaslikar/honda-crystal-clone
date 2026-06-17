const axios = require('axios');
const cheerio = require('cheerio');

async function searchBing(query) {
    try {
        const res = await axios.get(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC3`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const $ = cheerio.load(res.data);
        const images = [];
        $('a.iusc').each((i, el) => {
            const m = $(el).attr('m');
            if (m) {
                try {
                    const data = JSON.parse(m);
                    if (data.murl) images.push(data.murl);
                } catch(e){}
            }
        });
        console.log(`Found ${images.length} images for ${query}`);
        if(images.length > 0) console.log("Top result:", images[0]);
    } catch(e) {
        console.log("Error:", e.message);
    }
}

searchBing('Honda Elevate Phoenix Orange Pearl transparent png');
searchBing('Honda Elevate Radiant Red Metallic transparent png');
searchBing('Honda Elevate Platinum White Pearl transparent png');
