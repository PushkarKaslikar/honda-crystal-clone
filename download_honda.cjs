const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  { name: 'orange', url: 'https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/phoenix_orange_pearl_with_crystal_black_pearl_roof/PHOENIX_ORANGE_PEARL_WITH_CRYSTAL_BLACK_PEARL_ROOF_18.png' },
  { name: 'red', url: 'https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/radiant_red_metallic/RADIANT_RED_METALLIC_18.png' },
  { name: 'white', url: 'https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/platinum_white_pearl/PLATINUM_WHITE_PEARL_18.png' },
  { name: 'blue', url: 'https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/obsidian_blue_pearl/OBSIDIAN_BLUE_PEARL_18.png' },
  { name: 'brown', url: 'https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/golden_brown_metallic/GOLDEN_BROWN_METALLIC_18.png' },
  { name: 'silver', url: 'https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/lunar_silver_metallic/LUNAR_SILVER_METALLIC_18.png' },
  { name: 'grey', url: 'https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/meteoroid_gray_metallic/METEOROID_GRAY_METALLIC_18.png' }
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
      // Fallback for orange if the black roof folder doesn't exist
      if (item.name === 'orange') {
          https.get('https://www.hondacarindia.com/web-data/models/2023/elevate/exterior/phoenix_orange_pearl/PHOENIX_ORANGE_PEARL_18.png', fallbackRes => {
              fallbackRes.pipe(fs.createWriteStream(destPath));
              console.log('Downloaded fallback orange');
          });
      }
    }
  }).on('error', err => {
    fs.unlink(destPath, () => {});
    console.log(`Error ${item.name}: ${err.message}`);
  });
});
