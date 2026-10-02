const https = require('https');
const fs = require('fs');
const path = require('path');

const cssUrl = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=block';

https.get(cssUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' } }, (res) => {
  let css = '';
  res.on('data', chunk => css += chunk);
  res.on('end', () => {
    const urls = [...css.matchAll(/url\((https:\/\/[^)]+)\)/g)].map(m => m[1]);
    const fontDir = path.join(__dirname, 'public', 'fonts');
    if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir, { recursive: true });
    
    let fontsDownloaded = 0;
    urls.forEach((url, i) => {
      const fileName = `plus-jakarta-sans-${i}.woff2`;
      const filePath = path.join(fontDir, fileName);
      css = css.replace(url, `/fonts/${fileName}`);
      
      https.get(url, (fontRes) => {
        const file = fs.createWriteStream(filePath);
        fontRes.pipe(file);
        fontRes.on('end', () => {
          fontsDownloaded++;
          if (fontsDownloaded === urls.length) {
            fs.writeFileSync(path.join(fontDir, 'fonts.css'), css);
            console.log('Fonts downloaded successfully');
          }
        });
      });
    });
  });
});
