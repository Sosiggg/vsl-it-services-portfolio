const Jimp = require('jimp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const root = path.resolve(__dirname, '..');
    const src = path.join(root, 'VSLIcon.jpg');
    const publicDir = path.join(root, 'public');

    if (!fs.existsSync(src)) {
      console.error('Source image not found at', src);
      process.exit(1);
    }

    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    const sizes = [
      { name: 'favicon-192.png', size: 192 },
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'favicon-48.png', size: 48 },
      { name: 'favicon-32.png', size: 32 },
      { name: 'favicon-16.png', size: 16 }
    ];

    for (const s of sizes) {
      const img = await Jimp.read(src);
      img.cover(s.size, s.size);
      await img.writeAsync(path.join(publicDir, s.name));
      console.log('Written', s.name);
    }

    const icoPngs = [
      path.join(publicDir, 'favicon-16.png'),
      path.join(publicDir, 'favicon-32.png')
    ];

    const icoBuffer = await pngToIco(icoPngs);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('Written favicon.ico');

    console.log('All favicons generated in', publicDir);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
