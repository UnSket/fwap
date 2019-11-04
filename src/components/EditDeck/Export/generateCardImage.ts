import { EditableLegendItemT } from '../../../model/types/Legend';
import { EditableImageT } from '../../../model/types/Card';

const imageLoadAsync = (imageUrl: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>(resolve => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      resolve(image);
    }
  })
};

const containImageInBox = (image: HTMLImageElement, boxSize: number) => {
  const {width, height} = image;

  if (width > height) {
    const scaleFactor = boxSize / width;
    const dHeight = height * scaleFactor;

    const verticalMargins = (boxSize - dHeight) / 2;

    return {
      dWidth: boxSize,
      dHeight,
      verticalMargins
    }
  } else {
    const scaleFactor = boxSize / height;
    const dWidth = width * scaleFactor;

    const horizontalMargins = (boxSize - dWidth) / 2;

    return {
      dWidth,
      dHeight: boxSize,
      horizontalMargins
    }
  }
};

export const generateCardImage = (items: Array<EditableLegendItemT | EditableImageT>) => {
  const canvas = document.createElement('canvas');
  canvas.id     = "CursorLayer";
  canvas.width  = 336;
  canvas.height = 336;

  const ctx = canvas.getContext('2d')!;
  ctx.arc(168, 168, 168, 0, Math.PI * 2);

  return canvas.toDataURL();
};

export async function generateBacksideCardImage(imageSrc: string) {
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
