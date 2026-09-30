/* Размеры JPEG/PNG без внешних зависимостей — нужны next/image для
   правильных пропорций скриншотов разной высоты. */
import fs from 'node:fs';

export function imageSize(file) {
  const buf = fs.readFileSync(file);
  // PNG: ширина и высота в заголовке IHDR
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: ищем маркер SOF0–SOF15 (кроме DHT/JPG/DAC)
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
  }
  return null;
}
