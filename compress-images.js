import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, 'src', 'assets');

async function compressImages() {
  if (!fs.existsSync(assetsDir)) {
    console.log('Assets directory not found');
    return;
  }

  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg|webp)$/i.test(file)
  );

  for (const file of imageFiles) {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`Compressing ${file} (${sizeInMB}MB)...`);

    try {
      if (/\.png$/i.test(file)) {
        await sharp(filePath)
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(filePath + '.tmp');
      } else if (/\.(jpg|jpeg)$/i.test(file)) {
        await sharp(filePath)
          .jpeg({ quality: 75, progressive: true })
          .toFile(filePath + '.tmp');
      } else if (/\.webp$/i.test(file)) {
        await sharp(filePath)
          .webp({ quality: 75 })
          .toFile(filePath + '.tmp');
      }

      fs.renameSync(filePath + '.tmp', filePath);
      const newStats = fs.statSync(filePath);
      const newSizeInMB = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

      console.log(`✓ ${file}: ${sizeInMB}MB → ${newSizeInMB}MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error compressing ${file}:`, error.message);
    }
  }
}

compressImages().catch(console.error);
