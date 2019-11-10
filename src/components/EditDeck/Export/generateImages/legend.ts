import { EditableLegendItemT, LegendSourceTypeEnum } from '../../../../model/types/Legend';
import { formatCardNumber, getUrlFromImgKey } from '../../../utils/utils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { canvasToBlobAsync, containImageInBox, imageLoadAsync, QUALITY_FACTOR } from './utils';


async function generateLegendCardImage(items: Array<EditableLegendItemT>, fontSize: number, isNumerated: boolean, cardNumber: number) {
  const imageBoxSize = fontSize * 3 * QUALITY_FACTOR;
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
  ctx.font = `${fontSize * QUALITY_FACTOR}px Arial`;
  for (const item of items) {
    if (item.legendSourceType === LegendSourceTypeEnum.text) {
      ctx.fillText(item.source, item.positionX * QUALITY_FACTOR, item.positionY * QUALITY_FACTOR + fontSize * QUALITY_FACTOR);
    } else {
      const image  = await imageLoadAsync(getUrlFromImgKey(item.source));
      const {dWidth, dHeight, verticalMargins = 0, horizontalMargins = 0} = containImageInBox(image, imageBoxSize);
      ctx.drawImage(image, item.positionX * QUALITY_FACTOR + horizontalMargins, item.positionY * QUALITY_FACTOR + verticalMargins, dWidth, dHeight);
    }
  }
  if (isNumerated) {
    const fontSize = 16 * QUALITY_FACTOR;
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.font = `${fontSize}px Arial`;
    const text = formatCardNumber(cardNumber + 1);
    ctx.fillText(text, 168 * QUALITY_FACTOR, 295 * QUALITY_FACTOR + fontSize);
  }

  const blob = await canvasToBlobAsync(canvas) as Blob;
  return blob;
};

async function downloadLegendImages(cards: Array<Array<EditableLegendItemT>>, fontSize: number, isNumerated: boolean) {
  // parallel resolving
  const imagesPromises: Array<Promise<Blob>> = cards.map((items, index) => generateLegendCardImage(items, fontSize, isNumerated, index));
  const images = await Promise.all(imagesPromises);

  const zip = new JSZip();
  images.forEach((image: Blob, index: number) => {
    zip.file(`legend_${index+1}.png`, image, {base64: true});
  });
  const content = await zip.generateAsync({type:"blob"});
  saveAs(content, "legend.zip");
};

export default downloadLegendImages;
