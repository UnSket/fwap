import { containImageInBox, imageLoadAsync } from './utils';

async function generateBacksideCardImage(imageSrc: string) {
  const canvas = document.createElement('canvas');
  canvas.id     = "CursorLayer";
  canvas.width  = 336;
  canvas.height = 336;

  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 336, 336);
  ctx.arc(168, 168, 168, 0, Math.PI * 2);
  ctx.clip();
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.fill();

  const image = await imageLoadAsync(imageSrc);
  const {dWidth, dHeight, verticalMargins = 0, horizontalMargins = 0} = containImageInBox(image, 336);
  ctx.drawImage(image, horizontalMargins, verticalMargins, dWidth, dHeight);

  return canvas.toDataURL();
};

export default generateBacksideCardImage;
