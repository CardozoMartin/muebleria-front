import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, 'src', 'assets');

async function compressImagesInDir(dir, dirName = 'root') {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  if (imageFiles.length === 0) {
    console.log(`No images found in ${dirName}`);
    return;
  }

  console.log(`\n📁 Compressing images in ${dirName}...`);

  for (const file of imageFiles) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`  ⏳ Compressing ${file} (${sizeInMB}MB)...`);

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

      console.log(`  ✓ ${file}: ${sizeInMB}MB → ${newSizeInMB}MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`  ✗ Error compressing ${file}:`, error.message);
    }
  }
}

async function optimizeProductImages() {
  console.log(`\n🎯 Optimizing product images to 1200x600...`);
  
  const assetsDir = path.join(__dirname, 'src', 'assets');
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  for (const file of imageFiles) {
    // Skip plantillas (canva), solo optimizar imágenes de productos
    if (file.includes('blackfriday') || file.includes('feriadedescuentos') || 
        file.includes('flashsale') || file.includes('hotsale') || 
        file.includes('megaoferta') || file.includes('megasale')) {
      continue;
    }

    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);

    try {
      // Obtener metadata para ver dimensiones actuales
      const metadata = await sharp(filePath).metadata();
      const isLarger = metadata.width > 1200 || metadata.height > 600;

      if (!isLarger) {
        console.log(`  ℹ️  ${file}: Already optimized (${metadata.width}x${metadata.height})`);
        continue;
      }

      console.log(`  ⏳ Resizing ${file} (${metadata.width}x${metadata.height}) to 1200x600...`);

      if (/\.png$/i.test(file)) {
        await sharp(filePath)
          .resize(1200, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(filePath + '.tmp');
      } else if (/\.(jpg|jpeg)$/i.test(file)) {
        await sharp(filePath)
          .resize(1200, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0 } })
          .jpeg({ quality: 75, progressive: true })
          .toFile(filePath + '.tmp');
      } else if (/\.webp$/i.test(file)) {
        await sharp(filePath)
          .resize(1200, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ quality: 75 })
          .toFile(filePath + '.tmp');
      }

      fs.renameSync(filePath + '.tmp', filePath);
      const newStats = fs.statSync(filePath);
      const newSizeInMB = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

      console.log(`  ✓ ${file}: ${sizeInMB}MB → ${newSizeInMB}MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`  ✗ Error optimizing ${file}:`, error.message);
    }
  }
}

async function compressImages() {
  console.log('🚀 Starting image optimization...\n');

  // Comprimir raíz de assets
  await compressImagesInDir(assetsDir, 'src/assets');

  // Comprimir carpeta canva específicamente
  const canvaDir = path.join(assetsDir, 'canva');
  await compressImagesInDir(canvaDir, 'src/assets/canva');

  // Optimizar imágenes de productos a 1200x600
  await optimizeProductImages();

  console.log('\n✅ All optimizations completed!');
}

compressImages().catch(console.error);
