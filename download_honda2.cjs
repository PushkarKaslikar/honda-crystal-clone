const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  { name: 'silver', url: 'https://www.hondacarindia.com/web-data/models/2025/elevate/exterior/adv_new/lunar_silver_metallic_with_crystal_black_pearl_roof_new/elevate_adv_ext_360_00018.png' },
  { name: 'grey', url: 'https://www.hondacarindia.com/web-data/models/2025/elevate/exterior/adv_new/meteoroid_grey_metallic_with_crystal_black_pearl_roof/elevate_adv_ext_360_00018.png' }
];

const destFolder = path.join(__dirname, 'src', 'assets');

downloads.forEach(item => {
  const destPath = path.join(destFolder, `off_elevate_${item.name}.png`);
  const file = fs.createWriteStream(destPath);
  https.get(item.url, response => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${item.name}`);
      });
    } else {
      console.log(`Failed ${item.name} with status: ${response.statusCode}`);
    }
  }).on('error', err => {
    fs.unlink(destPath, () => {});
    console.log(`Error ${item.name}: ${err.message}`);
  });
});
