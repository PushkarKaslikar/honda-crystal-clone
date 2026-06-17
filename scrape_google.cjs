const axios = require('axios');

async function searchGoogleImages(query) {
    try {
        const res = await axios.get(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' }
        });
        
        // Google images often embeds base64 strings or image urls in the page source
        // Let's look for a valid image URL ending in jpg/png
        const urls = res.data.match(/https:\/\/[^"']+\.(jpg|jpeg|png|webp)/g) || [];
        
        // Filter out google's own icons
        const validUrls = urls.filter(u => !u.includes('gstatic') && !u.includes('google'));
        
        if (validUrls.length > 0) {
            console.log(`Query: ${query} => Found: ${validUrls[0]}`);
        } else {
            console.log(`Query: ${query} => No standard URLs found. Looking for base64...`);
            const b64 = res.data.match(/data:image\/(jpeg|png|gif);base64,[A-Za-z0-9+/=]+/g);
            if (b64 && b64.length > 0) {
                 console.log(`Query: ${query} => Found Base64 thumbnail! length: ${b64[0].length}`);
            }
        }
    } catch(e) {
        console.log("Error:", e.message);
    }
}

searchGoogleImages('Honda Elevate Phoenix Orange Pearl side profile transparent');
searchGoogleImages('Honda Elevate Radiant Red Metallic car');
searchGoogleImages('Honda Elevate Platinum White Pearl');
