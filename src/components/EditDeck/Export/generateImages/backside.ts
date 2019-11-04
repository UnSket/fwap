import { containImageInBox, imageLoadAsync, QUALITY_FACTOR } from './utils';

async function generateBacksideCardImage(imageSrc: string) {
  const canvas = document.createElement('canvas');
  canvas.id     = "CursorLayer";
  canvas.width  = 336 * QUALITY_FACTOR;
  canvas.height = 336 * QUALITY_FACTOR;

  const ctx = canvas.getContext('2d')!;
  ctx.arc(168 * QUALITY_FACTOR, 168 * QUALITY_FACTOR, 168 * QUALITY_FACTOR, 0, Math.PI * 2);
  ctx.clip();
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.fill();

  const image = await imageLoadAsync(imageSrc);
  const {dWidth, dHeight, verticalMargins = 0, horizontalMargins = 0} = containImageInBox(image, 336 * QUALITY_FACTOR);
  ctx.drawImage(image, horizontalMargins, verticalMargins, dWidth, dHeight);

  return canvas.toDataURL();
};

export default generateBacksideCardImage;
