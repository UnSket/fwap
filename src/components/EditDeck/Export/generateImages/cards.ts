import { EditableImageT } from '../../../../model/types/Card';
import { canvasToBlobAsync, containImageInBox, imageLoadAsync } from './utils';
import { getUrlFromImgKey } from '../../../utils/utils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

async function generateCardImage(items: Array<EditableImageT>) {
  const images = await Promise.all(items.map(i => imageLoadAsync(getUrlFromImgKey(i.imageUrl))));
  const canvas = document.createElement('canvas');
  canvas.width  = 336;
  canvas.height = 336;

  const ctx = canvas.getContext('2d')!;
  ctx.arc(168, 168, 168, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.clip();


  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";

  items.forEach((item, index) => {
    //debugger
    const boxSize = item.scaleFactor;
    const image  = images[index];
    const {dWidth, dHeight} = containImageInBox(image, boxSize);
    const radFactor = Math.PI/180;
    const angleRad = item.rotationAngle * radFactor;
    const imageCenterX = item.positionX + item.scaleFactor / 2;
    const imageCenterY = item.positionY + item.scaleFactor / 2;

    ctx.translate(imageCenterX, imageCenterY);
    ctx.rotate(angleRad);

    ctx.drawImage(image, -dWidth / 2,  -dHeight / 2, dWidth, dHeight);

    ctx.restore();
  });


  const blob = await canvasToBlobAsync(canvas) as Blob;
  return blob;
}

async function downloadCardsImages(cards: Array<Array<EditableImageT>>, deckName: string) {
  const imagesPromises: Array<Promise<Blob>> = [];

  // parallel resolving
  for (const items of cards) {
    const imagePromise = generateCardImage(items);
    imagesPromises.push(imagePromise);
  }
  const images = await Promise.all(imagesPromises);

  const zip = new JSZip();
  images.forEach((image: Blob, index: number) => {
    zip.file(`card_${index+1}.png`, image, {base64: true});
  });
  const content = await zip.generateAsync({type:"blob"});
  saveAs(content, `deck_${deckName}.zip`);
}

export default downloadCardsImages;
