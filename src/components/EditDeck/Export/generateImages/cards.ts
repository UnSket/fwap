import { EditableImageT } from '../../../../model/types/Card';
import { canvasToBlobAsync, containImageInBox, imageLoadAsync, QUALITY_FACTOR } from './utils';
import { formatCardNumber, getUrlFromImgKey } from '../../../utils/utils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

async function generateCardImage(items: Array<EditableImageT>, isNumerated: boolean, cardNumber: number) {
  const images = await Promise.all(items.map(i => imageLoadAsync(getUrlFromImgKey(i.imageUrl))));
  const canvas = document.createElement('canvas');
  canvas.width  = 336 * QUALITY_FACTOR;
  canvas.height = 336 * QUALITY_FACTOR;

  const ctx = canvas.getContext('2d')!;
  ctx.arc(168 * QUALITY_FACTOR, 168 * QUALITY_FACTOR, 168 * QUALITY_FACTOR, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.clip();


  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  items.forEach((item, index) => {
    const boxSize = item.scaleFactor * QUALITY_FACTOR;
    const image  = images[index];
    const {dWidth, dHeight} = containImageInBox(image, boxSize);
    const radFactor = Math.PI/180;
    const angleRad = item.rotationAngle * radFactor;
    const imageCenterX = item.positionX * QUALITY_FACTOR + boxSize / 2;
    const imageCenterY = item.positionY * QUALITY_FACTOR + boxSize / 2;

    ctx.save();

    ctx.translate(imageCenterX, imageCenterY);
    ctx.rotate(angleRad);

    ctx.drawImage(image, -dWidth / 2,  -dHeight / 2, dWidth, dHeight);

    ctx.restore();
  });

  if (isNumerated) {
    const fontSize = 16 * QUALITY_FACTOR;
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(formatCardNumber(cardNumber + 1), 168 * QUALITY_FACTOR, 168 * QUALITY_FACTOR);
  }


  const blob = await canvasToBlobAsync(canvas) as Blob;
  return blob;
}

async function downloadCardsImages(cards: Array<Array<EditableImageT>>, deckName: string, isNumerated: boolean) {
  // parallel resolving
  const imagesPromises: Array<Promise<Blob>> = cards.map((items, index) => generateCardImage(items, isNumerated, index));
  const images = await Promise.all(imagesPromises);

  const zip = new JSZip();
  images.forEach((image: Blob, index: number) => {
    zip.file(`card_${index+1}.png`, image, {base64: true});
  });
  const content = await zip.generateAsync({type:"blob"});
  saveAs(content, `deck_${deckName}.zip`);
}

export default downloadCardsImages;
